import {Module} from "@nestjs/common";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {JwtStrategy} from "../security/strategy/jwt.strategy";
import {AuthService} from "../service/auth.service";
import {JwtAuthGuard} from "../security/guard/jwt-auth.guard";
import {CryptoService} from "../service/crypto.service";
import {PassportModule} from "@nestjs/passport";
import {UserEntity} from "../model/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "../web/controller/auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => {
				return {
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: '60s'
					}
				};
			}
		}),
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [
		AuthService,
		CryptoService,
		PassportModule,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		}
	],
	controllers: [AuthController]
})
export class AuthModule {}
