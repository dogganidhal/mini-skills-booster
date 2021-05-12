import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorator/public.decorator";
import {Role} from "../enums/role.enum";
import {ROLES_KEY} from "../decorator/role.decorator";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic || !requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.some((role) => user.roles === role);
	}
}
