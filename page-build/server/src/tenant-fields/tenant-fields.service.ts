import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantFieldsRepository } from './tenant-fields.repository';
import { UpdateTenantFieldDto } from './dto/update-tenant-field.dto';

@Injectable()
export class TenantFieldsService {
  constructor(private readonly repo: TenantFieldsRepository) {}

  getBySection(tenantSectionId: string) {
    return this.repo.findBySection(tenantSectionId);
  }

  async update(id: string, dto: UpdateTenantFieldDto) {
    const field = await this.repo.findById(id);
    if (!field) throw new NotFoundException('Tenant field not found');
    return this.repo.update(id, dto);
  }
}
