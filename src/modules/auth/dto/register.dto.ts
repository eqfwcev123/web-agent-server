import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
	@ApiProperty({
		description: 'User email address',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'User password',
		example: 'password123',
		minLength: 6,
	})
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string;

	@ApiPropertyOptional({
		description: 'Username (optional)',
		example: 'john_doe',
	})
	@IsOptional()
	@IsString()
	username?: string;
}
