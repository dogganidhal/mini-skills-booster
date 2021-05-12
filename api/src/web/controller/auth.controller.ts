import {Body, Controller, Post} from "@nestjs/common";
import {TokenDto} from "../dto/token.dto";
import {Public} from "../../security/decorator/public.decorator";
import {AuthService} from "../../service/auth.service";
import {LoginRequestDto} from "../dto/login-request.dto";
import {SignUpRequestDto} from "../dto/sign-up-request.dto";
import {UserDto} from "../dto/user.dto";


@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post("/login")
	@Public()
	public async login(@Body() request: LoginRequestDto): Promise<TokenDto> {
		return this.authService.login(request);
	}

	@Post("/signup")
	@Public()
	public async signUp(@Body() request: SignUpRequestDto): Promise<UserDto> {
		return this.authService.signUp(request);
	}

}
