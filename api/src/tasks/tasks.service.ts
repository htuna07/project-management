import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseService } from 'src/interface/database-service';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService extends DatabaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private r: Repository<Task>,
  ) {
    super(r);
  }
}
