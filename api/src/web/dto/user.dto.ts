import {Role} from "../../security/enums/role.enum";


export interface UserDto {
	readonly id: number;
	readonly fullName: string;
	readonly email: string;
	readonly role: Role;
}
