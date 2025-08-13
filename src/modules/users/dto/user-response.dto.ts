import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LearningStyle } from '../../../common/enums/session-status.enum';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 'uuid-string',
  })
  id: string;

  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Username',
    example: 'john_doe',
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'Learning style preference',
    enum: LearningStyle,
    example: LearningStyle.VISUAL,
  })
  learningStyle?: LearningStyle;

  @ApiPropertyOptional({
    description: 'Difficulty preference',
    enum: ['beginner', 'intermediate', 'advanced'],
    example: 'intermediate',
  })
  difficultyPreference?: 'beginner' | 'intermediate' | 'advanced';

  @ApiProperty({
    description: 'Account creation date',
    example: '2025-08-14T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2025-08-14T15:45:00Z',
  })
  updatedAt: Date;
}

export class UserProgressDto {
  @ApiProperty({
    description: 'Number of problems solved',
    example: 25,
  })
  problemsSolved: number;

  @ApiProperty({
    description: 'Total learning sessions',
    example: 40,
  })
  totalSessions: number;

  @ApiPropertyOptional({
    description: 'User achievements',
    example: ['first_problem', 'streak_7_days', 'hard_problem_solver'],
  })
  achievements?: string[];

  @ApiProperty({
    description: 'Current learning streak in days',
    example: 7,
  })
  currentStreak: number;

  @ApiProperty({
    description: 'Average session duration in minutes',
    example: 45,
  })
  averageSessionDuration: number;
}
