import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;
	let dataSource: DataSource;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		// Apply global pipes and filters like in main.ts
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
		);

		dataSource = app.get(DataSource);
		await app.init();
	});

	afterAll(async () => {
		if (dataSource && dataSource.isInitialized) {
			await dataSource.destroy();
		}
		await app.close();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Hello World!');
	});

	it('/health (GET)', () => {
		return request(app.getHttpServer()).get('/health').expect(200);
	});
});
