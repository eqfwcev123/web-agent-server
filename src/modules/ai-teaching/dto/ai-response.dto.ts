import { ApiProperty } from '@nestjs/swagger';

export class CodeIssueDto {
  @ApiProperty({
    description: 'Line number where the issue occurs',
    example: 3,
  })
  line: number;

  @ApiProperty({
    description: 'Type of issue',
    enum: ['error', 'warning', 'suggestion'],
    example: 'warning',
  })
  type: 'error' | 'warning' | 'suggestion';

  @ApiProperty({
    description: 'Description of the issue',
    example:
      'This nested loop approach has O(n²) time complexity. Consider using a hash table for O(n) solution.',
  })
  message: string;

  @ApiProperty({
    description: 'Severity of the issue',
    enum: ['high', 'medium', 'low'],
    example: 'medium',
  })
  severity: 'high' | 'medium' | 'low';
}

export class CodeAnalysisDto {
  @ApiProperty({
    description: 'Correctness score (0-100)',
    example: 85,
  })
  correctness: number;

  @ApiProperty({
    description: 'Efficiency score (0-100)',
    example: 60,
  })
  efficiency: number;

  @ApiProperty({
    description: 'Readability score (0-100)',
    example: 90,
  })
  readability: number;

  @ApiProperty({
    description: 'Issues found in the code',
    type: [CodeIssueDto],
  })
  issues: CodeIssueDto[];

  @ApiProperty({
    description: 'Suggestions for improvement',
    example: [
      'Use a hash table to reduce time complexity',
      'Add input validation',
    ],
    type: [String],
  })
  improvements: string[];
}

export class AIExplanationResponseDto {
  @ApiProperty({
    description: 'AI generated explanation',
    example:
      "This problem can be solved using a hash table approach. Here's how it works...",
  })
  explanation: string;

  @ApiProperty({
    description: 'Code analysis if provided',
    required: false,
  })
  codeAnalysis?: CodeAnalysisDto;

  @ApiProperty({
    description: 'Actionable suggestions',
    example: [
      'Try implementing with a hash table',
      'Consider edge cases like duplicate numbers',
    ],
    type: [String],
  })
  suggestions: string[];

  @ApiProperty({
    description: 'Next steps for learning',
    example: [
      'Practice more hash table problems',
      'Learn about space-time tradeoffs',
    ],
    type: [String],
  })
  nextSteps: string[];

  @ApiProperty({
    description: 'Interaction timestamp',
    example: '2025-08-14T10:30:00Z',
  })
  timestamp: Date;
}
