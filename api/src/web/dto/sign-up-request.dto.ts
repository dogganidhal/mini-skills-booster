import {Role} from "../../security/enums/role.enum";


export interface SignUpRequestDto {
	readonly fullName: string;
	readonly email: string;
	readonly password: string;
	readonly role: Role;
}
