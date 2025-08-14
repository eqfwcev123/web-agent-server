import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();

		if (!user) {
			return false;
		}

		// TODO: Implement role checking based on your user model
		// This is a placeholder implementation
		const userRoles = user.roles || ['user'];

		return requiredRoles.some((role) => userRoles.includes(role));
	}
}
