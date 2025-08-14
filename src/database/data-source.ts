import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Load environment variables
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: configService.get('DATABASE_HOST') || 'localhost',
	port: configService.get('DATABASE_PORT') || 5432,
	username: configService.get('DATABASE_USERNAME') || 'postgres',
	password: configService.get('DATABASE_PASSWORD') || 'password',
	database: configService.get('DATABASE_NAME') || 'web_agent_db',
	entities: ['src/modules/**/entities/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	synchronize: false,
	logging: configService.get('DATABASE_LOGGING') === 'true',
	ssl:
		configService.get('NODE_ENV') === 'production'
			? { rejectUnauthorized: false }
			: false,
});
