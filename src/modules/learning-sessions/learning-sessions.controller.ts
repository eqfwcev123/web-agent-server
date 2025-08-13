import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LearningSessionsService } from './learning-sessions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLearningSessionDto, UpdateSessionProgressDto } from './dto/session.dto';
import { LearningSessionResponseDto } from './dto/session-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../../common/dto/response.dto';

@ApiTags('learning-sessions')
@Controller('learning-sessions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LearningSessionsController {
  constructor(
    private readonly learningSessionsService: LearningSessionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new learning session' })
  @ApiResponse({
    status: 201,
    description: 'Learning session created successfully',
    type: LearningSessionResponseDto,
  })
  async create(
    @Body() createDto: CreateLearningSessionDto,
    @Request() req: any,
  ): Promise<LearningSessionResponseDto> {
    const userId = req.user.userId; // Extract from JWT token
    return await this.learningSessionsService.createSession(userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learning sessions for the user' })
  @ApiResponse({
    status: 200,
    description: 'Learning sessions retrieved successfully',
    type: PaginatedResponseDto,
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Request() req: any,
  ): Promise<PaginatedResponseDto<LearningSessionResponseDto>> {
    const userId = req.user.userId;
    return await this.learningSessionsService.findAll(userId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific learning session' })
  @ApiResponse({
    status: 200,
    description: 'Learning session retrieved successfully',
    type: LearningSessionResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<LearningSessionResponseDto | null> {
    return await this.learningSessionsService.findOne(id);
  }

  @Put(':id/progress')
  @ApiOperation({ summary: 'Update learning session progress' })
  @ApiResponse({
    status: 200,
    description: 'Session progress updated successfully',
    type: LearningSessionResponseDto,
  })
  async updateProgress(
    @Param('id') id: string,
    @Body() progressDto: UpdateSessionProgressDto,
  ): Promise<LearningSessionResponseDto> {
    return await this.learningSessionsService.updateProgress(id, progressDto);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Mark learning session as completed' })
  @ApiResponse({
    status: 200,
    description: 'Session completed successfully',
    type: LearningSessionResponseDto,
  })
  async completeSession(@Param('id') id: string): Promise<LearningSessionResponseDto> {
    return await this.learningSessionsService.completeSession(id);
  }

  @Put(':id/pause')
  @ApiOperation({ summary: 'Pause learning session' })
  @ApiResponse({
    status: 200,
    description: 'Session paused successfully',
    type: LearningSessionResponseDto,
  })
  async pauseSession(@Param('id') id: string): Promise<LearningSessionResponseDto> {
    return await this.learningSessionsService.pauseSession(id);
  }
}
