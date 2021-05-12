import {Module} from "@nestjs/common";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {JwtStrategy} from "../security/strategy/jwt.strategy";
import {AuthService} from "../service/auth.service";
import {JwtAuthGuard} from "../security/guard/jwt-auth.guard";
import {CryptoService} from "../service/crypto.service";
import {PassportModule} from "@nestjs/passport";
import {User} from "../model/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "../web/controller/auth.controller";
import {RefreshToken} from "../model/refresh-token.entity";


@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => {
				return {
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: '3600s'
					}
				};
			}
		}),
		TypeOrmModule.forFeature([User, RefreshToken]),
	],
	providers: [
		AuthService,
		CryptoService,
		PassportModule,
		JwtStrategy,
		JwtAuthGuard
	],
	controllers: [AuthController]
})
export class AuthModule {}
