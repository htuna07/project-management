import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Project } from './projects/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configurations
    ConfigModule.forRoot({ envFilePath: ['.database.env'] }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Project, Task, User],
      synchronize: true,
    }),
    // Main Modules
    UsersModule,
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
