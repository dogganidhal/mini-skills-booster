import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Quiz} from "./quiz.entity";
import {Suggestion} from "./suggestion.entity";
import {QuestionType} from "../enums/question-type.enum";


@Entity('questions')
export class Question {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@Column()
	public type: QuestionType;

	@JoinColumn({ name: 'quiz_id' })
	@ManyToOne(() => Quiz)
	public quiz: Quiz;

	@OneToMany(() => Suggestion, answer => answer.question, { cascade: true })
	public suggestions: Suggestion[];
}
