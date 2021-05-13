import {QuestionType} from "../../../enums/question-type.enum";
import {Suggestion} from "./suggestion.dto";


export interface Question {
	readonly id: number;
	readonly content: string;
	readonly type: QuestionType;
	readonly suggestions?: Suggestion[];
}
