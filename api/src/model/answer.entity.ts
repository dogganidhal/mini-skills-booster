import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";


@Entity()
export class AnswerEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@ManyToOne(() => QuestionEntity, question => question.answers)
	public question: QuestionEntity;
}
