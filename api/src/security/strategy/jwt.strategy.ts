import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { User } from 'src/web/dto/output/user.dto';
import {AuthService} from "../../service/auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		});
	}

	public async validate(payload: any, done: (error: Error, user: User | false) => any) {
		const user = await this.authService.userById(payload.id);
		if (!user) {
			return done(new UnauthorizedException(), false);
		}
		done(null, user);
	}

}
