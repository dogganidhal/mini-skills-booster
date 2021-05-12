import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AnswerEntity} from "./answer.entity";


@Entity()
export class QuestionEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@OneToMany(() => AnswerEntity, answer => answer.question)
	public answers: AnswerEntity[];
}
