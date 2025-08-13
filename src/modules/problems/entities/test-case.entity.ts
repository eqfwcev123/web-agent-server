import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Problem } from './problem.entity';

@Entity('test_cases')
export class TestCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  input: string;

  @Column('text')
  expectedOutput: string;

  @Column('text', { nullable: true })
  explanation: string;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({ name: 'problem_id' })
  problemId: string;
}
