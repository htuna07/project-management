import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseService } from 'src/interface/database-service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends DatabaseService<User> {
  constructor(
    @InjectRepository(User)
    private r: Repository<User>,
  ) {
    super(r);
  }
}
