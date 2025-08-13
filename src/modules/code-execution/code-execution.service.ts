import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExecuteCodeDto } from './dto/execute-code.dto';
import { ValidationResultDto } from './dto/validation-result.dto';
import { ProgrammingLanguage, LanguageConfig } from '../../common/enums/language.enum';

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
}

interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
  exit_code: number | null;
  token: string;
}

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);
  private readonly judge0BaseUrl: string;
  private readonly judge0ApiKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.judge0BaseUrl = this.configService.get<string>('codeExecution.judge0Url') || 
                        'https://judge0-ce.p.rapidapi.com';
    this.judge0ApiKey = this.configService.get<string>('codeExecution.judge0ApiKey');
  }

  async executeCode(executeDto: ExecuteCodeDto): Promise<ValidationResultDto> {
    const startTime = Date.now();
    
    try {
      if (!this.judge0ApiKey) {
        return this.getMockExecutionResult(executeDto, startTime);
      }

      const languageId = this.getLanguageId(executeDto.language);
      if (!languageId) {
        throw new BadRequestException(`Unsupported language: ${executeDto.language}`);
      }

      const submission: Judge0Submission = {
        source_code: executeDto.code,
        language_id: languageId,
        stdin: executeDto.input || '',
        cpu_time_limit: 2, // 2 seconds
        memory_limit: 128000, // 128MB in KB
      };

      // Submit code for execution
      const submissionResponse = await firstValueFrom(
        this.httpService.post(
          `${this.judge0BaseUrl}/submissions`,
          submission,
          {
            headers: {
              'X-RapidAPI-Key': this.judge0ApiKey,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
            params: {
              base64_encoded: 'false',
              wait: 'true', // Wait for execution to complete
            },
          },
        ),
      );

      const result: Judge0Result = submissionResponse.data;
      
      return this.processExecutionResult(result, executeDto, startTime);
    } catch (error) {
      this.logger.error('Error executing code:', error);
      return this.getMockExecutionResult(executeDto, startTime, error.message);
    }
  }

  async validateSolution(
    executeDto: ExecuteCodeDto,
    testCases: Array<{ input: string; expectedOutput: string; isHidden: boolean; weight: number }>,
  ): Promise<ValidationResultDto> {
    const startTime = Date.now();
    
    try {
      const results = [];
      let totalScore = 0;
      let totalWeight = 0;
      let passedTests = 0;

      for (const testCase of testCases) {
        const testExecute = {
          ...executeDto,
          input: testCase.input,
        };

        const result = await this.executeCode(testExecute);
        
        const passed = this.compareOutputs(result.output, testCase.expectedOutput);
        
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.output,
          passed,
          isHidden: testCase.isHidden,
          weight: testCase.weight,
          executionTime: result.executionTime,
          memoryUsed: result.memoryUsed,
        });

        if (passed) {
          totalScore += testCase.weight;
          passedTests++;
        }
        totalWeight += testCase.weight;

        // If execution failed, don't continue with other test cases
        if (!result.success) {
          break;
        }
      }

      const scorePercentage = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;

      return {
        success: passedTests === testCases.length,
        output: results.length > 0 ? results[0].actualOutput : '',
        error: results.find(r => !r.passed && !r.isHidden)?.actualOutput || null,
        executionTime: Math.max(...results.map(r => r.executionTime || 0)),
        memoryUsed: Math.max(...results.map(r => r.memoryUsed || 0)),
        testResults: results.filter(r => !r.isHidden), // Only return visible test results
        score: scorePercentage,
        passedTests: passedTests,
        totalTests: testCases.length,
        metadata: {
          language: executeDto.language,
          responseTime: Date.now() - startTime,
          judgeSystem: 'Judge0',
        },
      };
    } catch (error) {
      this.logger.error('Error validating solution:', error);
      return {
        success: false,
        output: '',
        error: `Validation error: ${error.message}`,
        executionTime: 0,
        memoryUsed: 0,
        testResults: [],
        score: 0,
        passedTests: 0,
        totalTests: testCases.length,
        metadata: {
          language: executeDto.language,
          responseTime: Date.now() - startTime,
          judgeSystem: 'Mock',
          error: error.message,
        },
      };
    }
  }

  // Legacy method for backward compatibility
  async executeCodeLegacy(
    code: string,
    language: string,
    input?: string,
  ): Promise<any> {
    return {
      output: `Mock output for ${language} code`,
      error: null,
      executionTime: 100,
      status: 'success',
    };
  }

  private processExecutionResult(
    result: Judge0Result,
    executeDto: ExecuteCodeDto,
    startTime: number,
  ): ValidationResultDto {
    const success = result.status.id === 3; // Status 3 = Accepted
    const output = result.stdout || '';
    const error = result.stderr || result.compile_output || null;
    const executionTime = result.time ? parseFloat(result.time) * 1000 : 0; // Convert to ms
    const memoryUsed = result.memory || 0;

    return {
      success,
      output: output.trim(),
      error: error?.trim() || null,
      executionTime,
      memoryUsed,
      testResults: [],
      score: success ? 100 : 0,
      passedTests: success ? 1 : 0,
      totalTests: 1,
      metadata: {
        language: executeDto.language,
        responseTime: Date.now() - startTime,
        judgeSystem: 'Judge0',
        status: result.status.description,
        exitCode: result.exit_code,
        token: result.token,
      },
    };
  }

  private compareOutputs(actual: string, expected: string): boolean {
    // Normalize whitespace and compare
    const normalizeOutput = (str: string) => 
      str.trim().replace(/\s+/g, ' ').toLowerCase();
    
    return normalizeOutput(actual) === normalizeOutput(expected);
  }

  private getLanguageId(language: ProgrammingLanguage): number | null {
    const languageMap: Record<ProgrammingLanguage, number> = {
      [ProgrammingLanguage.JAVASCRIPT]: 63, // Node.js
      [ProgrammingLanguage.PYTHON]: 71, // Python 3
      [ProgrammingLanguage.JAVA]: 62, // Java 8
      [ProgrammingLanguage.CPP]: 54, // C++ 17
      [ProgrammingLanguage.C]: 50, // C (GCC 9.2.0)
      [ProgrammingLanguage.CSHARP]: 51, // C# (Mono 6.6.0.161)
      [ProgrammingLanguage.GO]: 60, // Go (1.13.5)
      [ProgrammingLanguage.RUST]: 73, // Rust (1.40.0)
      [ProgrammingLanguage.KOTLIN]: 78, // Kotlin (1.3.70)
      [ProgrammingLanguage.SWIFT]: 83, // Swift (5.2.3)
      [ProgrammingLanguage.TYPESCRIPT]: 74, // TypeScript (3.7.4)
    };

    return languageMap[language] || null;
  }

  private getMockExecutionResult(
    executeDto: ExecuteCodeDto,
    startTime: number,
    errorMessage?: string,
  ): ValidationResultDto {
    if (errorMessage) {
      return {
        success: false,
        output: '',
        error: `Mock execution error: ${errorMessage}`,
        executionTime: 100,
        memoryUsed: 1024,
        testResults: [],
        score: 0,
        passedTests: 0,
        totalTests: 1,
        metadata: {
          language: executeDto.language,
          responseTime: Date.now() - startTime,
          judgeSystem: 'Mock',
          note: 'This is a mock execution. Configure Judge0 API for real code execution.',
        },
      };
    }

    // Simple mock execution that "succeeds" for basic code
    const success = executeDto.code.length > 10; // Basic heuristic
    
    return {
      success,
      output: success ? 'Mock execution successful' : '',
      error: success ? null : 'Code appears too short',
      executionTime: Math.random() * 500, // Random execution time
      memoryUsed: Math.floor(Math.random() * 10000), // Random memory usage
      testResults: [],
      score: success ? 100 : 0,
      passedTests: success ? 1 : 0,
      totalTests: 1,
      metadata: {
        language: executeDto.language,
        responseTime: Date.now() - startTime,
        judgeSystem: 'Mock',
        note: 'This is a mock execution. Configure Judge0 API for real code execution.',
      },
    };
  }
}
