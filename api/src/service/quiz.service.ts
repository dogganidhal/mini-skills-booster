import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Quiz as QuizEntity} from "../model/quiz.entity";
import {User as UserEntity} from "../model/user.entity";
import {Quiz} from "../web/dto/output/quiz.dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateQuestionRequest, CreateQuizRequest} from "../web/dto/input/create-quiz.dto";
import {ModelIncludes} from "../model";
import {QuestionType} from "../enums/question-type.enum";
import {Question} from "../model/question.entity";
import {PartialDeep} from "type-fest";


@Injectable()
export class QuizService {

	constructor(
		@InjectRepository(QuizEntity)
		private quizRepository: Repository<QuizEntity>,
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
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
		return this.quizRepository.find({ relations: ModelIncludes.Quiz.All });
	}

	public async quizById(quizId: number): Promise<Quiz> {
		const quiz = await this.quizRepository.findOne(quizId, { relations: ModelIncludes.Quiz.All });
		if (!quiz) {
			throw new NotFoundException();
		}
		return quiz;
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

}
