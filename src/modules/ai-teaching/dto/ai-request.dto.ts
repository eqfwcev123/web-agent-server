import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AIInteractionType } from '../../../common/enums/session-status.enum';
import { ProgrammingLanguage } from '../../../common/enums/language.enum';

export class ExplainProblemDto {
	@ApiProperty({
		description: 'Problem ID to explain',
		example: 'uuid-string',
	})
	@IsString()
	problemId: string;

	@ApiPropertyOptional({
		description: 'Specific aspect to explain',
		example: 'approach',
	})
	@IsOptional()
	@IsString()
	aspect?: string;

	@ApiPropertyOptional({
		description: "User's current understanding level",
		enum: ['beginner', 'intermediate', 'advanced'],
		example: 'intermediate',
	})
	@IsOptional()
	@IsEnum(['beginner', 'intermediate', 'advanced'])
	userLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export class AnalyzeCodeDto {
	@ApiProperty({
		description: 'Code to analyze',
		example:
			'def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]',
	})
	@IsString()
	code: string;

	@ApiProperty({
		description: 'Programming language',
		enum: ProgrammingLanguage,
		example: ProgrammingLanguage.PYTHON,
	})
	@IsEnum(ProgrammingLanguage)
	language: ProgrammingLanguage;

	@ApiPropertyOptional({
		description: 'Problem context for analysis',
		example: 'uuid-string',
	})
	@IsOptional()
	@IsString()
	problemId?: string;

	@ApiPropertyOptional({
		description: 'Type of analysis requested',
		enum: AIInteractionType,
		example: AIInteractionType.CODE_ANALYSIS,
	})
	@IsOptional()
	@IsEnum(AIInteractionType)
	analysisType?: AIInteractionType;
}

export class GetHintDto {
	@ApiProperty({
		description: 'Problem ID to get hint for',
		example: 'uuid-string',
	})
	@IsString()
	problemId: string;

	@ApiPropertyOptional({
		description: 'Current user progress or stuck point',
		example:
			'I understand the problem but not sure about the optimal approach',
	})
	@IsOptional()
	@IsString()
	currentProgress?: string;

	@ApiPropertyOptional({
		description: 'Specific question or area needing help',
		example: 'How can I improve the time complexity?',
	})
	@IsOptional()
	@IsString()
	specificQuestion?: string;
}

// Generic AI request DTO (union type for all AI requests)
export type AiRequestDto = ExplainProblemDto | AnalyzeCodeDto | GetHintDto;
