import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {Credentials} from "../dto/output/credentials.dto";
import {AuthService} from "../../service/auth.service";
import {LoginRequest} from "../dto/input/login.dto";
import {SignUpRequest} from "../dto/input/sign-up.dto";
import {User} from "../dto/output/user.dto";
import {RefreshCredentialsRequest} from "../dto/input/refresh-credentials.dto";
import {Subject} from "../../security/decorator/subject.decorator";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {Principal} from "../dto/output/principal.dto";


@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post("login")
	public async login(@Body() request: LoginRequest): Promise<Credentials> {
		return this.authService.login(request);
	}

	@Post("signup")
	public async signUp(@Body() request: SignUpRequest): Promise<User> {
		return this.authService.signUp(request);
	}

	@Post("refresh")
	public async refreshCredentials(@Body() request: RefreshCredentialsRequest): Promise<Credentials> {
		return this.authService.refreshCredentials(request);
	}

	@Get("me")
	@UseGuards(JwtAuthGuard)
	public async getUser(@Subject() principal: Principal): Promise<User> {
		return this.authService.userById(principal.id);
	}

}
