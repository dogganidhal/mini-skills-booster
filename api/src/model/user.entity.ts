import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../security/enums/role.enum";


@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public email: string;

	@Column()
	public fullName: string;

	@Column()
	public passwordHash: string;

	@Column()
	public role: Role;
}
