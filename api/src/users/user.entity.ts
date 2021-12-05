import { Project } from 'src/projects/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  avatar: string;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];
}
