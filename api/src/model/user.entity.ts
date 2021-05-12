import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public email: string;

	@Column({ name: 'full_name' })
	public fullName: string;

	@Column({ name: 'password_hash' })
	public passwordHash: string;
}
