import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./question.entity";


@Entity('suggestions')
export class Suggestion {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@Column({ name: 'is_correct' })
	public isCorrect: boolean;

	@JoinColumn({ name: 'question_id' })
	@ManyToOne(() => Question, question => question.suggestions)
	public question: Question;
}
