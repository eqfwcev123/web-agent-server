import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
	'jwt',
	(): JwtModuleOptions => ({
		secret: process.env.JWT_SECRET || 'fallback-secret-key',
		signOptions: {
			expiresIn: process.env.JWT_EXPIRES_IN || '24h',
		},
	}),
);

export const jwtConstants = {
	secret: process.env.JWT_SECRET || 'fallback-secret-key',
	expiresIn: process.env.JWT_EXPIRES_IN || '24h',
	refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
	refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
