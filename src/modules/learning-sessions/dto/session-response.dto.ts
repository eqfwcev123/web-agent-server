import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SessionStatus, SessionProgressStep } from '../../../common/enums/session-status.enum';

export class SessionProgressResponseDto {
  @ApiProperty({
    description: 'Progress step ID',
    example: 'uuid-string',
  })
  id: string;

  @ApiProperty({
    description: 'Step number in the learning sequence',
    example: 3,
  })
  step: number;

  @ApiProperty({
    description: 'Description of this progress step',
    example: 'Understanding the problem constraints',
  })
  description: string;

  @ApiProperty({
    description: 'Whether this step is completed',
    example: true,
  })
  completed: boolean;

  @ApiPropertyOptional({
    description: 'Additional data for this step',
    example: { timeSpent: 300, hintsUsed: 1 },
  })
  data?: Record<string, any>;
}

export class LearningSessionResponseDto {
  @ApiProperty({
    description: 'Session ID',
    example: 'uuid-string',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'uuid-string',
  })
  userId: string;

  @ApiProperty({
    description: 'Problem ID',
    example: 'uuid-string',
  })
  problemId: string;

  @ApiProperty({
    description: 'Session progress percentage',
    example: 75,
  })
  progress: number;

  @ApiProperty({
    description: 'Current session status',
    enum: SessionStatus,
    example: SessionStatus.ACTIVE,
  })
  status: SessionStatus;

  @ApiPropertyOptional({
    description: 'Session metadata and progress data',
    example: { currentStep: 'implementation', hintsUsed: 2, codeAttempts: 3 },
  })
  sessionData?: Record<string, any>;

  @ApiProperty({
    description: 'Session start time',
    example: '2025-08-14T10:30:00Z',
  })
  startedAt: Date;

  @ApiPropertyOptional({
    description: 'Session completion time',
    example: '2025-08-14T11:45:00Z',
  })
  completedAt?: Date;

  @ApiProperty({
    description: 'Progress steps completed in this session',
    type: [SessionProgressResponseDto],
  })
  progressSteps: SessionProgressResponseDto[];

  @ApiProperty({
    description: 'Total time spent in minutes',
    example: 75,
  })
  timeSpent: number;
}
