import { Injectable, NotFoundException } from '@nestjs/common';
import { FieldsRepository } from './fields.repository';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(private readonly repo: FieldsRepository) {}

  create(dto: CreateFieldDto) {
    return this.repo.create(dto);
  }

  findBySection(sectionId: string) {
    return this.repo.findBySection(sectionId);
  }

  async update(id: string, dto: UpdateFieldDto) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Field not found');

    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
