import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProgrammingLanguage } from '../../../common/enums/language.enum';

export class AnalyzeProblemDto {
  @ApiProperty({
    description: 'The algorithm problem text to analyze',
    example:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  })
  @IsString()
  problemText: string;

  @ApiPropertyOptional({
    description: 'Preferred programming language for examples',
    enum: ProgrammingLanguage,
    example: ProgrammingLanguage.PYTHON,
  })
  @IsOptional()
  @IsEnum(ProgrammingLanguage)
  language?: ProgrammingLanguage;

  @ApiPropertyOptional({
    description: 'User experience level',
    enum: ['beginner', 'intermediate', 'advanced'],
    example: 'intermediate',
  })
  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
}
