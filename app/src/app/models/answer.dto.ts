import {Question} from "./question.dto";
import {Suggestion} from "./suggestion.dto";


export interface Answer {
	readonly id: number;
	readonly question: Question;
	readonly content?: string;
	readonly suggestions?: Suggestion[];
}
