import {IsEmail, IsNotEmpty} from "class-validator";


export class LoginRequest {
	@IsEmail()
	public email: string;
	@IsNotEmpty()
	public password: string;
}
