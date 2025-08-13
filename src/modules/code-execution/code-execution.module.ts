import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CodeExecutionController } from './code-execution.controller';
import { CodeExecutionService } from './code-execution.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [CodeExecutionController],
  providers: [CodeExecutionService],
  exports: [CodeExecutionService],
})
export class CodeExecutionModule {}
