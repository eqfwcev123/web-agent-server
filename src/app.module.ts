import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import configurations
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import appConfig, { aiConfig, codeExecutionConfig } from './config/app.config';

// Import common components
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// Import gateways
import { LearningGateway } from './gateways/learning.gateway';
import { AiTeachingModule } from './modules/ai-teaching/ai-teaching.module';
import { AuthModule } from './modules/auth/auth.module';
import { CodeExecutionModule } from './modules/code-execution/code-execution.module';
import { LearningSessionsModule } from './modules/learning-sessions/learning-sessions.module';
import { ProblemsModule } from './modules/problems/problems.module';
import { UsersModule } from './modules/users/users.module';

// Import feature modules

@Module({
	imports: [
		// Configuration
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [
				databaseConfig,
				jwtConfig,
				appConfig,
				aiConfig,
				codeExecutionConfig,
			],
		}),

		// Database
		TypeOrmModule.forRootAsync({
			useFactory: () => databaseConfig(),
		}),

		// Rate limiting
		ThrottlerModule.forRoot([
			{
				name: 'short',
				ttl: 1000,
				limit: 3,
			},
			{
				name: 'medium',
				ttl: 10000,
				limit: 20,
			},
			{
				name: 'long',
				ttl: 60000,
				limit: 100,
			},
		]),

		// Feature modules
		AuthModule,
		UsersModule,
		ProblemsModule,
		AiTeachingModule,
		LearningSessionsModule,
		CodeExecutionModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		LearningGateway,
		// Global interceptors
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
		// Global exception filter
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}
