import { Controller, Post, Body } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';

@Controller('code-execution')
export class CodeExecutionController {
  constructor(private readonly codeExecutionService: CodeExecutionService) {}

  @Post('run')
  async runCode(
    @Body() runDto: { code: string; language: string; input?: string },
  ) {
    return await this.codeExecutionService.executeCode(
      runDto.code,
      runDto.language,
      runDto.input,
    );
  }

  @Post('validate')
  async validateCode(@Body() validateDto: { code: string; problemId: string }) {
    return await this.codeExecutionService.validateSolution(
      validateDto.code,
      validateDto.problemId,
    );
  }
}
