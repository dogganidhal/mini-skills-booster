import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./question.entity";
import {Suggestion} from "./suggestion.entity";
import {Submission} from "./submission.entity";


@Entity('answers')
export class Answer {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: true })
	public content?: string;

	@JoinColumn({ name: 'question_id' })
	@ManyToOne(() => Question)
	public question: Question;

	@JoinTable({
		name: 'answer_suggestions',
		joinColumn: {
			name: 'suggestion_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'answer_id',
			referencedColumnName: 'id'
		}
	})
	@ManyToMany(() => Suggestion)
	public suggestions?: Suggestion[];

	@JoinColumn({ name: 'submission_id' })
	@ManyToOne(() => Submission, submission => submission.answers)
	public submission: Submission;
}
