import { Module } from '@nestjs/common';
import { AiTeachingController } from './ai-teaching.controller';
import { AiTeachingService } from './ai-teaching.service';
import { LangChainService } from './services/langchain.service';
import { OpenAiService } from './services/openai.service';

@Module({
	controllers: [AiTeachingController],
	providers: [AiTeachingService, OpenAiService, LangChainService],
	exports: [AiTeachingService],
})
export class AiTeachingModule {}
