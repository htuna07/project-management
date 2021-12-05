import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findAll(@Query() query?: Project): Promise<Project[]> {
    return this.projects.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projects.findOne(id);
  }

  @Post()
  insert(@Body() project: Project) {
    return this.projects.insert(project);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: Project) {
    project.id = parseInt(id);
    return this.projects.update(project);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projects.remove(id);
  }
}
