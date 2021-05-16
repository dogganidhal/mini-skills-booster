import {Submission} from "./submission.dto";


export interface Quiz {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	readonly submission?: Submission[];
}
