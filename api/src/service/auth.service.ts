import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Repository} from "typeorm";
import * as crypto from "crypto";
import {Credentials} from "../web/dto/output/credentials.dto";
import {LoginRequest} from "../web/dto/input/login.dto";
import {User as UserEntity} from "../model/user.entity";
import {CryptoService} from "./crypto.service";
import {User} from "../web/dto/output/user.dto";
import {SignUpRequest} from "../web/dto/input/sign-up.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshToken} from "../model/refresh-token.entity";
import {RefreshCredentialsRequest} from "../web/dto/input/refresh-credentials.dto";


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(RefreshToken)
		private refreshTokenRepository: Repository<RefreshToken>,
		private jwtService: JwtService,
		private cryptoService: CryptoService
	) {}

	public async login(request: LoginRequest): Promise<Credentials> {
		const user = await this.userRepository.findOne({email: request.email});
		if (!user) {
			throw new NotFoundException();
		}
		const passwordMatches = await this.cryptoService.verify(request.password, user.passwordHash);
		if (!passwordMatches) {
			throw new UnauthorizedException();
		}
		return this.credentialsForUser(user);
	}

	public async signUp(request: SignUpRequest): Promise<User> {
		let user = await this.userRepository.findOne({email: request.email});
		if (user) {
			throw new BadRequestException('User exists');
		}
		user = await this.userRepository.save({
			...request,
			passwordHash: await this.cryptoService.hash(request.password)
		});
		await this.generateAndSaveRefreshToken(user);
		return user;
	}

	public async refreshCredentials({ refreshToken }: RefreshCredentialsRequest): Promise<Credentials> {
		const refreshTokenEntity = await this.refreshTokenRepository.findOne({
			token: refreshToken
		}, {
			relations: ['user']
		});
		if (!refreshTokenEntity) {
			throw new NotFoundException();
		}
		const { user } = refreshTokenEntity;
		return this.credentialsForUser(user, refreshToken);
	}

	public async userById(id: number): Promise<User> {
		const user = this.userRepository.findOne({ id });
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}

	private async credentialsForUser(user: UserEntity, refreshToken?: string): Promise<Credentials> {
		const token = await this.jwtService.signAsync({
			id: user.id,
			email: user.email
		}, {
			subject: user.id.toString(),
			expiresIn: '3600s'
		});
		return {
			token,
			refreshToken: refreshToken || await this.findOrCreateRefreshToken(user),
			expiresIn: 3600
		};
	}

	private async findOrCreateRefreshToken(user: UserEntity): Promise<string> {
		const refreshTokenEntity = await this.refreshTokenRepository.findOne({
			user
		}, {
			relations: ['user']
		});
		if (refreshTokenEntity) {
			return refreshTokenEntity.token;
		}
		return this.generateAndSaveRefreshToken(user);
	}

	private async generateAndSaveRefreshToken(user: UserEntity): Promise<string> {
		const token = crypto.randomBytes(64).toString('hex');
		await this.refreshTokenRepository.save({
			token,
			user
		});
		return token;
	}

}
