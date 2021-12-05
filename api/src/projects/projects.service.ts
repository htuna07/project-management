import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseService } from 'src/interface/database-service';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService extends DatabaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private r: Repository<Project>,
  ) {
    super(r);
  }
}
