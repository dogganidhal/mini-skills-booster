import {Quiz} from "./quiz.dto";
import {User} from "./user.dto";
import {Answer} from "./answer.dto";


export interface Submission {
	readonly id: number;
	readonly quiz: Quiz;
	readonly user: User;
	readonly answers: Answer[];
}
