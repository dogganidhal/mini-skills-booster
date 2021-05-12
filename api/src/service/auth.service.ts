import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Repository} from "typeorm";
import {TokenDto} from "../web/dto/token.dto";
import {LoginRequestDto} from "../web/dto/login-request.dto";
import {UserEntity} from "../model/user.entity";
import {CryptoService} from "./crypto.service";
import {UserDto} from "../web/dto/user.dto";
import {SignUpRequestDto} from "../web/dto/sign-up-request.dto";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		private jwtService: JwtService,
		private cryptoService: CryptoService
	) {}

	public async login(request: LoginRequestDto): Promise<TokenDto> {
		const user = await this.userRepository.findOne({email: request.email});
		if (!user) {
			throw new NotFoundException();
		}
		const passwordMatches = await this.cryptoService.verify(request.password, user.passwordHash);
		if (!passwordMatches) {
			throw new UnauthorizedException();
		}
		const token = await this.jwtService.signAsync({
			id: user.id,
			role: user.role,
			email: user.email
		}, {
			subject: user.id.toString(),
			audience: user.role,
			expiresIn: '60s'
		});
		return {
			token,
			expiresIn: 60
		};
	}

	public async signUp(request: SignUpRequestDto): Promise<UserDto> {
		let user = await this.userRepository.findOne({email: request.email});
		if (user) {
			throw new BadRequestException('User exists');
		}
		return await this.userRepository.save({
			...request,
			passwordHash: await this.cryptoService.hash(request.password)
		}) as UserDto;
	}

}
