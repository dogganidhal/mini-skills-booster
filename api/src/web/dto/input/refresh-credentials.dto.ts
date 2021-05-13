import {IsNotEmpty} from "class-validator";


export class RefreshCredentialsRequest {
	@IsNotEmpty()
	public refreshToken: string;
}
