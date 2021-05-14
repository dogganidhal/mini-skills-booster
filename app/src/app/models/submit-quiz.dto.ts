
export interface SubmitQuizRequest {
	readonly answers: SubmitAnswerRequest[];
}


export interface SubmitAnswerRequest {
	readonly questionId: number;
	readonly suggestionIds?: number[];
	readonly content?: string;
}
