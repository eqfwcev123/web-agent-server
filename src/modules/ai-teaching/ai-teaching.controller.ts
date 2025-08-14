import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { AiTeachingService } from './ai-teaching.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
	ExplainProblemDto,
	AnalyzeCodeDto,
	GetHintDto,
} from './dto/ai-request.dto';
import { AIExplanationResponseDto } from './dto/ai-response.dto';

@ApiTags('ai-teaching')
@Controller('ai-teaching')
export class AiTeachingController {
	constructor(private readonly aiTeachingService: AiTeachingService) {}

	@Post('explain')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get AI explanation for a problem' })
	@ApiResponse({
		status: 200,
		description: 'AI explanation generated successfully',
		type: AIExplanationResponseDto,
	})
	async explainProblem(
		@Body() explainDto: ExplainProblemDto,
	): Promise<AIExplanationResponseDto> {
		return await this.aiTeachingService.explainProblem(
			explainDto.problemId,
		);
	}

	@Post('analyze-code')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Analyze code with AI assistance' })
	@ApiResponse({
		status: 200,
		description: 'Code analysis completed successfully',
		type: AIExplanationResponseDto,
	})
	async analyzeCode(
		@Body() analyzeDto: AnalyzeCodeDto,
	): Promise<AIExplanationResponseDto> {
		return await this.aiTeachingService.analyzeCode(
			analyzeDto.code,
			analyzeDto.language,
		);
	}

	@Post('hint')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get a contextual hint for problem solving' })
	@ApiResponse({
		status: 200,
		description: 'Hint generated successfully',
		type: AIExplanationResponseDto,
	})
	async getHint(
		@Body() hintDto: GetHintDto,
	): Promise<AIExplanationResponseDto> {
		return await this.aiTeachingService.getHint(hintDto.problemId, {
			currentProgress: hintDto.currentProgress,
			specificQuestion: hintDto.specificQuestion,
		});
	}
}
