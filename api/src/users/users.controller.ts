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
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll(@Query() query?: User): Promise<User[]> {
    return this.users.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.users.findOne(id);
  }

  @Post()
  insert(@Body() user: User) {
    return this.users.insert(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User) {
    user.id = parseInt(id);
    return this.users.update(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
