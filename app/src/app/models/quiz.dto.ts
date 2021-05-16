import {Submission} from "./submission.dto";
import {Question} from "./question.dto";


export interface Quiz {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	readonly questions: Question[];
	readonly submission?: Submission[];
}
