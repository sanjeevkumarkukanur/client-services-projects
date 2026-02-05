import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantSectionsRepository } from './tenant-sections.repository';
import { UpdateTenantSectionDto } from './dto/update-tenant-section.dto';

@Injectable()
export class TenantSectionsService {
  constructor(private readonly repo: TenantSectionsRepository) {}

  getByPage(tenantPageId: string) {
    return this.repo.findByPage(tenantPageId);
  }

  async update(id: string, dto: UpdateTenantSectionDto) {
    const section = await this.repo.findById(id);
    if (!section) throw new NotFoundException('Tenant section not found');
    return this.repo.update(id, dto);
  }
}
