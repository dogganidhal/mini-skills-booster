import {Suggestion} from "./suggestion.dto";
import {QuestionType} from "./question-type.dto";


export interface Question {
	readonly id: number;
	readonly content: string;
	readonly type: QuestionType;
	readonly suggestions?: Suggestion[];
}
