import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LearningStyle } from '../../../common/enums/session-status.enum';

export class CreateUserDto {
	@ApiProperty({
		description: 'User email address',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'User password',
		example: 'securePassword123',
	})
	@IsString()
	password: string;

	@ApiPropertyOptional({
		description: 'Username',
		example: 'john_doe',
	})
	@IsOptional()
	@IsString()
	username?: string;

	@ApiPropertyOptional({
		description: 'User learning style preference',
		enum: LearningStyle,
		example: LearningStyle.VISUAL,
	})
	@IsOptional()
	@IsEnum(LearningStyle)
	learningStyle?: LearningStyle;

	@ApiPropertyOptional({
		description: 'Difficulty preference',
		enum: ['beginner', 'intermediate', 'advanced'],
		example: 'intermediate',
	})
	@IsOptional()
	@IsEnum(['beginner', 'intermediate', 'advanced'])
	difficultyPreference?: 'beginner' | 'intermediate' | 'advanced';
}
