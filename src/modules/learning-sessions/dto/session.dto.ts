import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLearningSessionDto {
	@ApiProperty({
		description: 'Problem ID to start learning session for',
		example: 'uuid-string',
	})
	@IsUUID()
	problemId: string;

	@ApiPropertyOptional({
		description: 'Initial session data or preferences',
		example: { approach: 'guided', difficulty: 'medium' },
	})
	@IsOptional()
	sessionData?: Record<string, any>;

	@ApiPropertyOptional({
		description: 'Session goals or objectives',
		example: 'Learn dynamic programming concepts',
	})
	@IsOptional()
	@IsString()
	goals?: string;
}

export class UpdateSessionProgressDto {
	@ApiProperty({
		description: 'Current progress percentage (0-100)',
		example: 75,
	})
	progress: number;

	@ApiPropertyOptional({
		description: 'Current session status',
		enum: ['active', 'paused', 'completed', 'abandoned'],
		example: 'active',
	})
	@IsOptional()
	@IsString()
	status?: 'active' | 'paused' | 'completed' | 'abandoned';

	@ApiPropertyOptional({
		description: 'Updated session data',
		example: { currentStep: 'implementation', hintsUsed: 2 },
	})
	@IsOptional()
	sessionData?: Record<string, any>;
}
