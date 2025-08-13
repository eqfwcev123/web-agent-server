import { ApiProperty } from '@nestjs/swagger';
import {
  Difficulty,
  ProblemCategory,
} from '../../../common/enums/difficulty.enum';

export class TestCaseDto {
  @ApiProperty({
    description: 'Input for the test case',
    example: '[2,7,11,15], 9',
  })
  input: string;

  @ApiProperty({
    description: 'Expected output for the test case',
    example: '[0,1]',
  })
  expectedOutput: string;

  @ApiProperty({
    description: 'Explanation of the test case',
    example: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
  })
  explanation?: string;
}

export class ProblemResponseDto {
  @ApiProperty({
    description: 'Problem ID',
    example: 'uuid-string',
  })
  id: string;

  @ApiProperty({
    description: 'Problem title',
    example: 'Two Sum',
  })
  title: string;

  @ApiProperty({
    description: 'Problem description',
    example: 'Given an array of integers nums and an integer target...',
  })
  description: string;

  @ApiProperty({
    description: 'Problem difficulty',
    enum: Difficulty,
    example: Difficulty.EASY,
  })
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Problem category',
    enum: ProblemCategory,
    example: ProblemCategory.ARRAY,
  })
  category: ProblemCategory;

  @ApiProperty({
    description: 'Problem tags',
    example: ['array', 'hash-table'],
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Hints for the problem',
    example: 'Use a hash table to store previously seen numbers',
  })
  hints: string;

  @ApiProperty({
    description: 'Suggested approach for solving',
    example: 'Use two-pass hash table approach',
  })
  suggestedApproach: string;

  @ApiProperty({
    description: 'Time complexity',
    example: 'O(n)',
  })
  timeComplexity: string;

  @ApiProperty({
    description: 'Space complexity',
    example: 'O(n)',
  })
  spaceComplexity: string;

  @ApiProperty({
    description: 'Test cases for the problem',
    type: [TestCaseDto],
  })
  testCases: TestCaseDto[];

  @ApiProperty({
    description: 'Creation date',
    example: '2025-08-14T10:30:00Z',
  })
  createdAt: Date;
}
