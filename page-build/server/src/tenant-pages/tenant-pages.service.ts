import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantPagesRepository } from './tenant-pages.repository';
import { UpdateTenantPageDto } from './dto/update-tenant-page.dto';

@Injectable()
export class TenantPagesService {
  constructor(private readonly repo: TenantPagesRepository) {}

  getByTenant(tenantId: string) {
    return this.repo.findByTenant(tenantId);
  }

  async getOne(id: string) {
    const page = await this.repo.findById(id);
    if (!page) throw new NotFoundException('Tenant page not found');
    return page;
  }

  update(id: string, dto: UpdateTenantPageDto) {
    return this.repo.update(id, dto);
  }
}
