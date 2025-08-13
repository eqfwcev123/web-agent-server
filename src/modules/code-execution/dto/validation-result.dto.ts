import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto {
  @ApiProperty({
    description: 'Code to validate against test cases',
    example:
      'def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Problem ID to validate against',
    example: 'uuid-string',
  })
  @IsString()
  problemId: string;
}

export class TestResultDto {
  @ApiProperty({
    description: 'Whether the test case passed',
    example: true,
  })
  passed: boolean;

  @ApiProperty({
    description: 'Input used for the test',
    example: '[2, 7, 11, 15], 9',
  })
  input: string;

  @ApiProperty({
    description: 'Expected output',
    example: '[0, 1]',
  })
  expectedOutput: string;

  @ApiProperty({
    description: 'Actual output from code execution',
    example: '[0, 1]',
  })
  actualOutput: string;

  @ApiProperty({
    description: 'Execution time in milliseconds',
    example: 15,
  })
  executionTime: number;

  @ApiProperty({
    description: 'Memory used in KB',
    example: 1024,
  })
  memoryUsed: number;

  @ApiProperty({
    description: 'Error message if any',
    example: null,
  })
  error?: string;
}

export class ValidationResultDto {
  @ApiProperty({
    description: 'Overall validation result',
    example: true,
  })
  passed: boolean;

  @ApiProperty({
    description: 'Score out of 100',
    example: 85,
  })
  score: number;

  @ApiProperty({
    description: 'Results for each test case',
    type: [TestResultDto],
  })
  testResults: TestResultDto[];

  @ApiProperty({
    description: 'Overall execution time',
    example: 45,
  })
  totalExecutionTime: number;

  @ApiProperty({
    description: 'Peak memory usage',
    example: 2048,
  })
  peakMemoryUsage: number;

  @ApiProperty({
    description: 'Performance feedback',
    example: 'Good performance! Your solution runs in O(n) time complexity.',
  })
  feedback?: string;
}
