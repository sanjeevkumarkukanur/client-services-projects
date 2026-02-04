import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesRepository } from './pages.repository';

@Injectable()
export class PagesService {
  constructor(private readonly repo: PagesRepository) {}

  create(dto: CreatePageDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdatePageDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
