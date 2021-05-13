import {QuestionType} from "../../../enums/question-type.enum";
import {ArrayNotEmpty, IsDateString, IsEnum, IsNotEmpty} from "class-validator";


export class CreateQuizRequest {
	@IsNotEmpty()
	public name: string;
	@IsNotEmpty()
	public description: string;
	@ArrayNotEmpty()
	public questions: CreateQuestionRequest[];
	@IsDateString()
	public dueDate: Date;
}


export class CreateQuestionRequest {
	@IsNotEmpty()
	public content: string;
	@IsEnum(QuestionType)
	public type: QuestionType;
	public suggestions?: CreateSuggestionRequest[];
}


export class CreateSuggestionRequest {
	@IsNotEmpty()
	public content: string;
	public isCorrect: boolean;
}
