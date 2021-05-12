import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity('refresh_tokens')
export class RefreshToken {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public token: string;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	public user: User;
}
