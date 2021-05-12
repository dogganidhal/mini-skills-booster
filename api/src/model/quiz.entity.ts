import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Question} from "./question.entity";
import {Submission} from "./submission.entity";


@Entity('quizzes')
export class Quiz {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@JoinColumn({ name: 'author_id' })
	@ManyToOne(() => User)
	public author: User;

	@OneToMany(() => Question, question => question.quiz, { cascade: true })
	public questions: Question[];

	@OneToMany(() => Submission, submission => submission.quiz, { cascade: true })
	public submissions: Submission[];
}
