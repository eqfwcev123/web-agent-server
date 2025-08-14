import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { SeedData } from './seed-data';
import { Logger } from '@nestjs/common';

async function runSeeds() {
	const logger = new Logger('DatabaseSeeder');

	try {
		// Create the Nest application context
		const app = await NestFactory.createApplicationContext(AppModule);

		// Get the DataSource
		const dataSource = app.get(DataSource);

		// Check if database is connected
		if (!dataSource.isInitialized) {
			await dataSource.initialize();
		}

		logger.log('🌱 Starting database seeding...');

		// Run the seed data
		await SeedData.run(dataSource);

		logger.log('✅ Database seeding completed successfully!');

		// Close the application context
		await app.close();

		process.exit(0);
	} catch (error) {
		logger.error('❌ Database seeding failed:', error);
		process.exit(1);
	}
}

// Run seeds if this file is executed directly
if (require.main === module) {
	runSeeds();
}
