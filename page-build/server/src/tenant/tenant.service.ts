import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { EnablePageDto } from './dto/enable-page.dto';

@Injectable()
export class TenantService {
  constructor(private readonly repo: TenantRepository) {}

  createTenant(dto: CreateTenantDto) {
    return this.repo.createTenant(dto);
  }

  async enablePage(tenantId: string, dto: EnablePageDto) {
    const tenant = await this.repo.findTenant(tenantId);
    if (!tenant) throw new NotFoundException('Tenant not found');

    const masterPage = await this.repo.getMasterPageByKey(dto.pageKey);
    if (!masterPage) throw new NotFoundException('Master page not found');

    // 1️⃣ Create tenant page
    const tenantPage = await this.repo.createTenantPage({
      tenantId,
      pageKey: masterPage.key,
      name: masterPage.name,
    });

    // 2️⃣ Copy sections and fields
    for (const section of masterPage.sections) {
      const tenantSection = await this.repo.createTenantSection({
        tenantPageId: tenantPage.id,
        key: section.key,
        title: section.title,
        order: section.order,
        layoutJson: section.layoutJson,
        stylesJson: section.stylesJson,
      });

      for (const field of section.fields) {
        await this.repo.createTenantField({
          tenantSectionId: tenantSection.id,
          key: field.key,
          label: field.label,
          type: field.type,
          order: field.order,
          uiJson: field.uiJson,
          stylesJson: field.stylesJson,
          validationJson: field.validationJson,
        });
      }
    }

    return {
      message: 'Page enabled for tenant',
      tenantPageId: tenantPage.id,
    };
  }
}
