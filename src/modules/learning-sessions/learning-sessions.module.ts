import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningSession } from './entities/learning-session.entity';
import { SessionProgress } from './entities/session-progress.entity';
import { LearningSessionsController } from './learning-sessions.controller';
import { LearningSessionsService } from './learning-sessions.service';

@Module({
	imports: [TypeOrmModule.forFeature([LearningSession, SessionProgress])],
	controllers: [LearningSessionsController],
	providers: [LearningSessionsService],
	exports: [LearningSessionsService],
})
export class LearningSessionsModule {}
