import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { Problem } from './entities/problem.entity';
import { TestCase } from './entities/test-case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, TestCase])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
