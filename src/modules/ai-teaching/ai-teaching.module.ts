import { Module } from '@nestjs/common';
import { AiTeachingController } from './ai-teaching.controller';
import { AiTeachingService } from './ai-teaching.service';
import { OpenAiService } from './services/openai.service';
import { LangChainService } from './services/langchain.service';

@Module({
  controllers: [AiTeachingController],
  providers: [AiTeachingService, OpenAiService, LangChainService],
  exports: [AiTeachingService],
})
export class AiTeachingModule {}
