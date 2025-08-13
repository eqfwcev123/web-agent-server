import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LearningSession } from './learning-session.entity';

@Entity('session_progress')
export class SessionProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LearningSession)
  @JoinColumn({ name: 'session_id' })
  session: LearningSession;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column()
  step: number;

  @Column('text')
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column('simple-json', { nullable: true })
  data: any;
}
