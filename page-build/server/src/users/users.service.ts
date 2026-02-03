import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  // findAll() {
  //   return this.repo.findAll();
  // }

  // update(id: string, dto: UpdateUserDto) {
  //   return this.repo.update(id, dto);
  // }
}
