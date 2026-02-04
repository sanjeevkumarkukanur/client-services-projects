import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantRepository {
  constructor(private readonly prisma: PrismaService) {}

  createTenant(data: {
    name: string;
    email: string;
    phone?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
  }) {
    return this.prisma.tenant.create({ data });
  }

  findTenant(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  getMasterPageByKey(pageKey: string) {
    return this.prisma.page.findUnique({
      where: { key: pageKey },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            fields: { orderBy: { order: 'asc' } },
          },
        },
      },
    });
  }

  createTenantPage(data: { tenantId: string; pageKey: string; name: string }) {
    return this.prisma.tenantPage.create({ data });
  }

  createTenantSection(data: {
    tenantPageId: string;
    key: string;
    title: string;
    order: number;
    layoutJson: any;
    stylesJson: any;
  }) {
    return this.prisma.tenantSection.create({ data });
  }

  createTenantField(data: {
    tenantSectionId: string;
    key: string;
    label: string;
    type: string;
    order: number;
    uiJson: any;
    stylesJson: any;
    validationJson: any;
  }) {
    return this.prisma.tenantField.create({ data });
  }
}
