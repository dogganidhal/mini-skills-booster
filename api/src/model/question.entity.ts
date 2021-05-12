import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Answer} from "./answer.entity";


@Entity('questions')
export class Question {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@OneToMany(() => Answer, answer => answer.question)
	public answers: Answer[];
}
