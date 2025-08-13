import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProblemsService } from './problems.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyzeProblemDto } from './dto/analyze-problem.dto';
import { ProblemResponseDto } from './dto/problem-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../../common/dto/response.dto';

@ApiTags('problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze a pasted algorithm problem using AI' })
  @ApiResponse({
    status: 201,
    description: 'Problem analyzed successfully',
    type: ProblemResponseDto,
  })
  async analyzeProblem(
    @Body() analysisRequest: AnalyzeProblemDto,
  ): Promise<ProblemResponseDto> {
    return await this.problemsService.analyzeProblem(analysisRequest);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all problems with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Problems retrieved successfully',
    type: PaginatedResponseDto,
  })
  async getAllProblems(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<ProblemResponseDto>> {
    return await this.problemsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific problem' })
  @ApiResponse({
    status: 200,
    description: 'Problem retrieved successfully',
    type: ProblemResponseDto,
  })
  async getProblem(@Param('id') id: string): Promise<ProblemResponseDto> {
    return await this.problemsService.findOne(id);
  }

  @Post(':id/start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a learning session for a problem' })
  @ApiResponse({
    status: 201,
    description: 'Learning session started successfully',
  })
  async startLearningSession(
    @Param('id') problemId: string,
  ): Promise<{ sessionId: string; problemId: string }> {
    return await this.problemsService.startLearningSession(problemId);
  }
}
