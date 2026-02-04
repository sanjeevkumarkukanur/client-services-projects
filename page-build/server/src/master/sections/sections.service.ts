import { Injectable, NotFoundException } from '@nestjs/common';
import { SectionsRepository } from './sections.repository';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly repo: SectionsRepository) {}

  create(dto: CreateSectionDto) {
    return this.repo.create(dto);
  }

  findByPage(pageId: string) {
    return this.repo.findByPage(pageId);
  }

  async update(id: string, dto: UpdateSectionDto) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Section not found');

    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
