import {QuestionType} from "./question-type.dto";

export interface CreateQuizRequest {
	readonly name: string;
	readonly description: string;
	readonly questions: CreateQuestionRequest[];
	readonly dueDate: Date;
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
