import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./question.entity";


@Entity('answers')
export class Answer {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@JoinColumn({ name: 'question_id' })
	@ManyToOne(() => Question, question => question.answers)
	public question: Question;
}
