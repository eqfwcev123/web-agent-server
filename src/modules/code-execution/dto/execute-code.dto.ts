import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProgrammingLanguage } from '../../../common/enums/language.enum';

export class ExecuteCodeDto {
  @ApiProperty({
    description: 'Code to execute',
    example:
      'def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []',
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
    description: 'Input for the code execution',
    example: '[2, 7, 11, 15]\n9',
  })
  @IsOptional()
  @IsString()
  input?: string;
}
