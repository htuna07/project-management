import { Project } from 'src/projects/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

enum Progress {
  Todo = 0,
  InProgress = 1,
  Done = 2,
  Failed = -1,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int', { default: Progress.Todo })
  progress: Progress;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
