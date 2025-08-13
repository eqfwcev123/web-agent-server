import { Module } from '@nestjs/common';
import { CodeExecutionController } from './code-execution.controller';
import { CodeExecutionService } from './code-execution.service';
import { SandboxService } from './services/sandbox.service';
import { Judge0Service } from './services/judge0.service';

@Module({
  controllers: [CodeExecutionController],
  providers: [CodeExecutionService, SandboxService, Judge0Service],
  exports: [CodeExecutionService],
})
export class CodeExecutionModule {}
