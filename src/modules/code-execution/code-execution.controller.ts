import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { CodeExecutionService } from './code-execution.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExecuteCodeDto } from './dto/execute-code.dto';
import {
	ValidateCodeDto,
	ValidationResultDto,
} from './dto/validation-result.dto';

@ApiTags('code-execution')
@Controller('code-execution')
export class CodeExecutionController {
	constructor(private readonly codeExecutionService: CodeExecutionService) {}

	@Post('run')
	@ApiOperation({ summary: 'Execute code in a secure sandbox environment' })
	@ApiResponse({
		status: 200,
		description: 'Code executed successfully',
	})
	async runCode(@Body() runDto: ExecuteCodeDto) {
		return await this.codeExecutionService.executeCode(runDto);
	}

	@Post('validate')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Validate code solution against test cases' })
	@ApiResponse({
		status: 200,
		description: 'Code validated successfully',
		type: ValidationResultDto,
	})
	async validateCode(
		@Body() validateDto: ValidateCodeDto,
	): Promise<ValidationResultDto> {
		// Convert ValidateCodeDto to ExecuteCodeDto for the service
		const executeDto: ExecuteCodeDto = {
			code: validateDto.code,
			language: 'python' as any, // TODO: Add language to ValidateCodeDto
			input: '', // TODO: Get input from problem test cases
		};

		// TODO: Get test cases from problem
		const testCases = []; // This should be fetched from the problem

		return await this.codeExecutionService.validateSolution(
			executeDto,
			testCases,
		);
	}
}
