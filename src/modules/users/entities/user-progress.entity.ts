import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'problems_solved', default: 0 })
  problemsSolved: number;

  @Column({ name: 'total_sessions', default: 0 })
  totalSessions: number;

  @Column('simple-json', { nullable: true })
  achievements: any;
}
