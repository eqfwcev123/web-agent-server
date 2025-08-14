import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('problems')
export class Problem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column('text')
	description: string;

	@Column()
	difficulty: string;

	@Column()
	category: string;

	@Column('simple-array', { nullable: true })
	tags: string[];

	@Column('text', { nullable: true })
	hints: string;

	@Column({ name: 'time_complexity', nullable: true })
	timeComplexity: string;

	@Column({ name: 'space_complexity', nullable: true })
	spaceComplexity: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
