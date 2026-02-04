import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { EnablePageDto } from './dto/enable-page.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TenantService {
  constructor(
    private readonly repo: TenantRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  // ✅ Create Tenant + OWNER User
  async createTenant(dto: CreateTenantDto) {
    // 1️⃣ Create Tenant
    const tenant = await this.repo.createTenant({
      name: dto.name,
      email: dto.email,
      planId: dto.planId,
      phone: dto.phone,
      website: dto.website,
      address: dto.address,
      city: dto.city,
      country: dto.country,
    });

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3️⃣ Create OWNER user
    const owner = await this.usersRepo.createUser({
      email: dto.email,
      name: dto.userName,
      password: hashedPassword,
      role: 'OWNER',
      tenantId: tenant.id,
    });

    // 4️⃣ Return response (never return password)
    return {
      tenant,
      owner: {
        id: owner.id,
        email: owner.email,
        role: owner.role,
      },
    };
  }

  // ✅ Your existing logic (unchanged)
  async enablePage(tenantId: string, dto: EnablePageDto) {
    // 0️⃣ Load tenant (must include planId)
    const tenant = await this.repo.findTenant(tenantId);
    if (!tenant) throw new NotFoundException('Tenant not found');

    if (!tenant.planId) {
      throw new ForbiddenException('Tenant does not have an active plan');
    }

    // 1️⃣ Load master page by key
    const masterPage = await this.repo.getMasterPageByKey(dto.pageKey);
    if (!masterPage) throw new NotFoundException('Master page not found');

    // 2️⃣ ✅ Check if plan allows this page
    const isAllowed = await this.repo.isPageAllowedForPlan(
      tenant.planId,
      masterPage.id,
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        'Your current plan does not allow this page/module',
      );
    }

    // 3️⃣ Create tenant page
    const tenantPage = await this.repo.createTenantPage({
      tenantId,
      pageKey: masterPage.key,
      name: masterPage.name,
    });

    // 4️⃣ Copy sections and fields
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
