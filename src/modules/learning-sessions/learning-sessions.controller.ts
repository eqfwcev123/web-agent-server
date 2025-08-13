import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { LearningSessionsService } from './learning-sessions.service';

@Controller('learning-sessions')
export class LearningSessionsController {
  constructor(
    private readonly learningSessionsService: LearningSessionsService,
  ) {}

  @Post()
  async create(@Body() createDto: any) {
    return await this.learningSessionsService.createSession(createDto);
  }

  @Get()
  async findAll() {
    return await this.learningSessionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learningSessionsService.findOne(id);
  }

  @Put(':id/progress')
  async updateProgress(@Param('id') id: string, @Body() progressDto: any) {
    return await this.learningSessionsService.updateProgress(id, progressDto);
  }
}
