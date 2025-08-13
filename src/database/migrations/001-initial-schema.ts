import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'student',
        "profile" jsonb,
        "preferences" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_username" UNIQUE ("username"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    // Create problems table
    await queryRunner.query(`
      CREATE TABLE "problems" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "difficulty" character varying NOT NULL,
        "category" character varying NOT NULL,
        "tags" text array NOT NULL DEFAULT '{}',
        "initial_code" jsonb NOT NULL,
        "solution" jsonb,
        "hints" text array NOT NULL DEFAULT '{}',
        "time_limit" integer NOT NULL DEFAULT 1000,
        "memory_limit" integer NOT NULL DEFAULT 128,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_problems_id" PRIMARY KEY ("id")
      )
    `);

    // Create test_cases table
    await queryRunner.query(`
      CREATE TABLE "test_cases" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "problem_id" uuid NOT NULL,
        "input" text NOT NULL,
        "expected_output" text NOT NULL,
        "is_hidden" boolean NOT NULL DEFAULT false,
        "weight" integer NOT NULL DEFAULT 1,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_test_cases_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_test_cases_problem" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE
      )
    `);

    // Create learning_sessions table
    await queryRunner.query(`
      CREATE TABLE "learning_sessions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "problem_id" uuid NOT NULL,
        "status" character varying NOT NULL DEFAULT 'active',
        "current_code" jsonb,
        "hints_used" integer NOT NULL DEFAULT 0,
        "attempts" integer NOT NULL DEFAULT 0,
        "completed_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_learning_sessions_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_learning_sessions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_learning_sessions_problem" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE
      )
    `);

    // Create session_progress table
    await queryRunner.query(`
      CREATE TABLE "session_progress" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "session_id" uuid NOT NULL,
        "step" integer NOT NULL,
        "step_type" character varying NOT NULL,
        "content" jsonb NOT NULL,
        "completed" boolean NOT NULL DEFAULT false,
        "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_session_progress_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_session_progress_session" FOREIGN KEY ("session_id") REFERENCES "learning_sessions"("id") ON DELETE CASCADE
      )
    `);

    // Create indexes for better performance
    await queryRunner.query(`CREATE INDEX "IDX_users_email" ON "users" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_users_username" ON "users" ("username")`);
    await queryRunner.query(`CREATE INDEX "IDX_problems_difficulty" ON "problems" ("difficulty")`);
    await queryRunner.query(`CREATE INDEX "IDX_problems_category" ON "problems" ("category")`);
    await queryRunner.query(`CREATE INDEX "IDX_learning_sessions_user" ON "learning_sessions" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_learning_sessions_status" ON "learning_sessions" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_session_progress_session" ON "session_progress" ("session_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_session_progress_session"`);
    await queryRunner.query(`DROP INDEX "IDX_learning_sessions_status"`);
    await queryRunner.query(`DROP INDEX "IDX_learning_sessions_user"`);
    await queryRunner.query(`DROP INDEX "IDX_problems_category"`);
    await queryRunner.query(`DROP INDEX "IDX_problems_difficulty"`);
    await queryRunner.query(`DROP INDEX "IDX_users_username"`);
    await queryRunner.query(`DROP INDEX "IDX_users_email"`);
    
    await queryRunner.query(`DROP TABLE "session_progress"`);
    await queryRunner.query(`DROP TABLE "learning_sessions"`);
    await queryRunner.query(`DROP TABLE "test_cases"`);
    await queryRunner.query(`DROP TABLE "problems"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
