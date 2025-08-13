import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LearningStyle } from '../../../common/enums/session-status.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username',
    example: 'john_doe_updated',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'User learning style preference',
    enum: LearningStyle,
    example: LearningStyle.KINESTHETIC,
  })
  @IsOptional()
  @IsEnum(LearningStyle)
  learningStyle?: LearningStyle;

  @ApiPropertyOptional({
    description: 'Difficulty preference',
    enum: ['beginner', 'intermediate', 'advanced'],
    example: 'advanced',
  })
  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  difficultyPreference?: 'beginner' | 'intermediate' | 'advanced';
}
