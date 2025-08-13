import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AiTeachingService } from './ai-teaching.service';

@Controller('ai-teaching')
export class AiTeachingController {
  constructor(private readonly aiTeachingService: AiTeachingService) {}

  @Get('explain/:problemId')
  async explainProblem(@Param('problemId') problemId: string) {
    return await this.aiTeachingService.explainProblem(problemId);
  }

  @Post('analyze-code')
  async analyzeCode(@Body() body: { code: string; language: string }) {
    return await this.aiTeachingService.analyzeCode(body.code, body.language);
  }

  @Get('hint/:problemId')
  async getHint(@Param('problemId') problemId: string) {
    return await this.aiTeachingService.getHint(problemId, {});
  }
}
