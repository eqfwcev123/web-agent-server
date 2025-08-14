import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CodeExecutionService } from './code-execution.service';
import { CodeExecutionController } from './code-execution.controller';

@Module({
	imports: [HttpModule, ConfigModule],
	controllers: [CodeExecutionController],
	providers: [CodeExecutionService],
	exports: [CodeExecutionService],
})
export class CodeExecutionModule {}
