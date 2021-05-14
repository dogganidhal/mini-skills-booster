import {Quiz} from "./quiz.dto";
import {Submission} from "./submission.dto";


export interface SubmissionReport {
	readonly quiz: Quiz,
	readonly submission: Submission;
}
