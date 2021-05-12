import {CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Answer} from "./answer.entity";
import {Quiz} from "./quiz.entity";


@Entity('submissions')
export class Submission {
	@PrimaryGeneratedColumn()
	public id: number;

	@CreateDateColumn()
	public date: Date;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	public user: User;

	@JoinColumn({ name: 'quiz_id' })
	@ManyToOne(() => Quiz)
	public quiz: Quiz;

	@OneToMany(() => Answer, answer => answer.submission, { cascade: true })
	public answers: Answer[];
}
