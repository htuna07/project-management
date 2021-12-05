import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  findAll(@Query() query?: Task): Promise<Task[]> {
    return this.tasks.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasks.findOne(id);
  }

  @Post()
  insert(@Body() task: Task) {
    return this.tasks.insert(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Task) {
    task.id = parseInt(id);
    return this.tasks.update(task);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasks.remove(id);
  }
}
