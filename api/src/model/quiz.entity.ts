import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('quizzes')
export class Quiz {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public name: string;

	@Column()
	public description: string;
}
