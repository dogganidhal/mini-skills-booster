import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./question.entity";
import {Suggestion} from "./suggestion.entity";
import {Submission} from "./submission.entity";


@Entity('answers')
export class Answer {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content?: string;

	@JoinColumn({ name: 'question_id' })
	@ManyToOne(() => Question)
	public question: Question;

	@JoinColumn({ name: 'submission_id' })
	@ManyToOne(() => Submission)
	public submission: Submission;

	@JoinColumn({ name: 'suggestion_id' })
	@ManyToOne(() => Suggestion)
	public suggestion?: Suggestion;
}
