import {ArrayNotEmpty, IsInt} from "class-validator";


export class SubmitQuizRequest {
	@ArrayNotEmpty()
	public answers: SubmitAnswerRequest[];
}


export class SubmitAnswerRequest {
	@IsInt()
	public questionId: number;
	public suggestionIds?: number[];
	public content?: string;
}
