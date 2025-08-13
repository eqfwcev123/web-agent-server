import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProblemsService } from './problems.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  type ProblemAnalysisRequest,
  type ProblemAnalysisResponse,
} from '../../common/interfaces/api.interface';

@ApiTags('problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze a pasted algorithm problem using AI' })
  @ApiResponse({
    status: 201,
    description: 'Problem analyzed successfully',
    type: 'ProblemAnalysisResponse',
  })
  async analyzeProblem(
    @Body() analysisRequest: ProblemAnalysisRequest,
  ): Promise<ProblemAnalysisResponse> {
    return await this.problemsService.analyzeProblem(analysisRequest);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all problems' })
  async getAllProblems() {
    return await this.problemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific problem' })
  async getProblem(@Param('id') id: string) {
    return await this.problemsService.findOne(id);
  }

  @Post(':id/start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a learning session for a problem' })
  async startLearningSession(@Param('id') problemId: string) {
    return await this.problemsService.startLearningSession(problemId);
  }
}
