import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class SignUpRequest {
	@IsNotEmpty()
	public fullName: string;
	@IsEmail()
	public email: string;
	@MinLength(6)
	public password: string;
}
