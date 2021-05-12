import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Quiz as QuizEntity} from "../model/quiz.entity";
import {User as UserEntity} from "../model/user.entity";
import {Quiz} from "../web/dto/output/quiz.dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateQuizRequest, CreateSuggestionRequest} from "../web/dto/input/create-quiz.dto";
import {ModelIncludes} from "../model";
import {Suggestion} from "../model/suggestion.entity";
import {QuestionType} from "../enums/question-type.enum";


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
			questions: request.questions.map(questionRequest => ({
				content: questionRequest.content,
				type: questionRequest.type,
				suggestions: QuizService.mapCreateSuggestionRequests(questionRequest.type, questionRequest.suggestions)
			}))
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

	private static mapCreateSuggestionRequests(questionType: QuestionType, suggestions: CreateSuggestionRequest[]): Partial<Suggestion>[] {
		const multipleCorrectSuggestions = suggestions.map(r => r.isCorrect).length > 1;
		if (questionType === QuestionType.SingleChoice && multipleCorrectSuggestions) {
			throw new BadRequestException('Single choice questions can\'t have multiple correct suggestions');
		}
		return suggestions.map(suggestionRequest => ({
			content: suggestionRequest.content,
			isCorrect: suggestionRequest.isCorrect
		}));
	}

}
