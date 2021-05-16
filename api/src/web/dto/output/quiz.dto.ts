import {Question} from "./question.dto";
import {Submission} from "./submission.dto";


export interface Quiz {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	readonly dueDate: Date;
	readonly questions: Question[];
	readonly submissions?: Submission[];
}
