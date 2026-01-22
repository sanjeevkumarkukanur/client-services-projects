import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  update(id: string, dto: UpdateUserDto) {
    return this.repo.update(id, dto);
  }
}
