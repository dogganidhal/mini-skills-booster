import {QuestionType} from "../../../enums/question-type.enum";


export interface CreateQuizRequest {
	readonly name: string;
	readonly description: string;
	readonly questions: CreateQuestionRequest[];
}


export interface CreateQuestionRequest {
	readonly content: string;
	readonly type: QuestionType;
	readonly suggestions?: CreateSuggestionRequest[];
}


export interface CreateSuggestionRequest {
	readonly content: string;
	readonly isCorrect: boolean;
}
