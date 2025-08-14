import { IsString, IsEnum, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Difficulty,
	ProblemCategory,
} from '../../../common/enums/difficulty.enum';

export class CreateProblemDto {
	@ApiProperty({
		description: 'Problem title',
		example: 'Two Sum',
	})
	@IsString()
	title: string;

	@ApiProperty({
		description: 'Problem description',
		example:
			'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
	})
	@IsString()
	description: string;

	@ApiProperty({
		description: 'Problem difficulty level',
		enum: Difficulty,
		example: Difficulty.EASY,
	})
	@IsEnum(Difficulty)
	difficulty: Difficulty;

	@ApiProperty({
		description: 'Problem category',
		enum: ProblemCategory,
		example: ProblemCategory.ARRAY,
	})
	@IsEnum(ProblemCategory)
	category: ProblemCategory;

	@ApiPropertyOptional({
		description: 'Problem tags',
		example: ['array', 'hash-table'],
		type: [String],
	})
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[];

	@ApiPropertyOptional({
		description: 'Hints for solving the problem',
		example:
			'Think about using a hash table to store the numbers you have seen.',
	})
	@IsOptional()
	@IsString()
	hints?: string;

	@ApiPropertyOptional({
		description: 'Time complexity',
		example: 'O(n)',
	})
	@IsOptional()
	@IsString()
	timeComplexity?: string;

	@ApiPropertyOptional({
		description: 'Space complexity',
		example: 'O(n)',
	})
	@IsOptional()
	@IsString()
	spaceComplexity?: string;
}
