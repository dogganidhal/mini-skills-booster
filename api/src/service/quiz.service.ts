import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {Quiz as QuizEntity} from "../model/quiz.entity";
import {User as UserEntity} from "../model/user.entity";
import {Submission as SubmissionEntity} from "../model/submission.entity";
import {Question as QuestionEntity} from "../model/question.entity";
import {Answer as AnswerEntity} from "../model/answer.entity";
import {Suggestion as SuggestionEntity} from "../model/suggestion.entity";
import {Quiz} from "../web/dto/output/quiz.dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateQuestionRequest, CreateQuizRequest} from "../web/dto/input/create-quiz.dto";
import {ModelIncludes} from "../model";
import {QuestionType} from "../enums/question-type.enum";
import {Question} from "../model/question.entity";
import {PartialDeep} from "type-fest";
import {SubmitAnswerRequest, SubmitQuizRequest} from "../web/dto/input/submit-quiz.dto";
import {SubmissionReport} from "../web/dto/output/submission-report.dto";
import {Submission} from "../web/dto/output/submission.dto";


@Injectable()
export class QuizService {

	constructor(
		@InjectRepository(QuizEntity)
		private quizRepository: Repository<QuizEntity>,
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(SubmissionEntity)
		private submissionRepository: Repository<SubmissionEntity>,
		@InjectRepository(QuestionEntity)
		private questionRepository: Repository<QuestionEntity>,
		@InjectRepository(SuggestionEntity)
		private suggestionRepository: Repository<SuggestionEntity>
	) {}

	public async createQuiz(authorId: number, request: CreateQuizRequest): Promise<Quiz> {
		const author = await this.userRepository.findOne(authorId);
		if (!author) {
			throw new NotFoundException();
		}
		return await this.quizRepository.save({
			author,
			name: request.name,
			description: request.description,
			dueDate: request.dueDate,
			questions: request.questions.map(QuizService.mapCreateQuestionRequests)
		});
	}

	public async listQuizzes(): Promise<Quiz[]> {
		return this.quizRepository.find({ relations: ModelIncludes.Quiz.ExceptSubmissions });
	}

	public async quizById(quizId: number, userId: number): Promise<Quiz> {
		let quiz = await this.quizRepository.findOne(quizId, { relations: ModelIncludes.Quiz.ExceptSubmissions });
		if (!quiz) {
			throw new NotFoundException();
		}
		// TODO: Find a more efficient way to do this
		if (quiz.author.id === userId) {
			quiz = await this.quizRepository.findOne(quizId, { relations: ModelIncludes.Quiz.All });
		}
		return quiz;
	}

	public async submitQuiz(userId: number, quizId: number, request: SubmitQuizRequest): Promise<SubmissionReport> {
		const existingSubmission = await this.submissionRepository.findOne({
			user: { id: userId },
			quiz: { id: quizId }
		});
		if (existingSubmission) {
			throw new BadRequestException('Quiz already answered, you cannot submit twice');
		}
		const quiz = await this.quizRepository.findOne(quizId, { relations: ModelIncludes.Quiz.All });
		if (!quiz) {
			throw new NotFoundException();
		}
		const answeredQuestionIds = request.answers.map(answer => answer.questionId);
		if (quiz.questions.some(question => !answeredQuestionIds.includes(question.id))) {
			throw new BadRequestException('Missing questions, please submit answers to all questions in quiz');
		}
		const user = await this.userRepository.findOneOrFail(userId);
		const submission = await this.submissionRepository.save({
			user,
			quiz,
			answers: await Promise.all(request.answers.map(this.mapSubmitAnswerRequests.bind(this)))
		});
		return {
			quiz: quiz,
			submission: await this.submissionRepository
				.findOneOrFail(submission.id, { relations: ModelIncludes.Submission.StudentReport })
		};
	}

	public async getUserQuizzes(userId: number): Promise<Quiz[]> {
		return this.quizRepository
			.createQueryBuilder('quiz')
			.leftJoinAndSelect('quiz.author', 'author')
			.leftJoinAndSelect('quiz.questions', 'questions')
			.leftJoinAndSelect('questions.suggestions', 'suggestions')
			.leftJoinAndSelect('quiz.submissions', 'submissions')
			.leftJoinAndSelect('submissions.answers', 'answers')
			.leftJoinAndSelect('answers.suggestions', 'answer_suggestions')
			.where('author.id=:userId', { userId })
			.getMany();
	}

	public async getUserSubmissions(userId: number): Promise<Submission[]> {
		return this.submissionRepository
			.createQueryBuilder('submission')
			.leftJoinAndSelect('submission.quiz', 'quiz')
			.leftJoinAndSelect('submission.user', 'user')
			.leftJoinAndSelect('submission.answers', 'answers')
			.leftJoinAndSelect('answers.question', 'question')
			.leftJoinAndSelect('question.suggestions', 'question_suggestions')
			.leftJoinAndSelect('answers.suggestions', 'answer_suggestions')
			.where('user.id=:userId', { userId })
			.getMany();
	}

	public async submissionById(submissionId: number, userId: number): Promise<Submission> {
		let submission = await this.submissionRepository.findOne(submissionId, { relations: ModelIncludes.Submission.All });
		if (!submission) {
			throw new NotFoundException();
		}
		if (submission.user.id === userId || submission.quiz.author.id === userId) {
			return submission;
		}
		throw new ForbiddenException();
	}

	private static mapCreateQuestionRequests(request: CreateQuestionRequest): PartialDeep<Question> {
		if (request.type === QuestionType.FreeText && request.suggestions) {
			throw new BadRequestException('Free text questions can\'t have suggestions');
		}
		const multipleCorrectSuggestions = (request.suggestions?.filter(r => r.isCorrect)?.length || 0) > 1;
		if (request.type === QuestionType.SingleChoice && multipleCorrectSuggestions) {
			throw new BadRequestException('Single choice questions can\'t have multiple correct suggestions');
		}
		return {
			content: request.content,
			type: request.type,
			suggestions: request.suggestions?.map(s => ({
				content: s.content,
				isCorrect: s.isCorrect
			}))
		};
	}

	private async mapSubmitAnswerRequests(request: SubmitAnswerRequest): Promise<PartialDeep<AnswerEntity>> {
		const question = await this.questionRepository.findOne(request.questionId);
		if (!question) {
			throw new NotFoundException(`No question with id ${request.questionId} was found`);
		}
		if (question.type === QuestionType.FreeText && !request.content) {
			throw new BadRequestException('Free form questions must have a non blank content property');
		}
		if (question.type !== QuestionType.FreeText && (!request.suggestionIds || request.suggestionIds.length === 0)) {
			throw new BadRequestException('Choice questions must have a non empty suggestionIds property');
		}

		return {
			question,
			content: request.content,
			suggestions: request.suggestionIds && await Promise.all(request.suggestionIds.map(id => this.mapSuggestionId(id, question)))
		};
	}

	private async mapSuggestionId(id: number, question: QuestionEntity): Promise<SuggestionEntity> {
		const suggestion = await this.suggestionRepository.findOne(id, { relations: ModelIncludes.Suggestion.All });
		if (!suggestion) {
			throw new NotFoundException();
		}
		if (suggestion.question.id !== question.id) {
			throw new BadRequestException(`Suggestion with id ${id} cannot be associated with question with id ${question.id}`);
		}
		return suggestion;
	}

}
