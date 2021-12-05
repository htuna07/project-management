import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    eager: true,
  })
  tasks: Task[];
}
