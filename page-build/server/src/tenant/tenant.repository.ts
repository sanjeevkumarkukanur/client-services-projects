import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Create tenant WITH planId
createTenant(data: {
  name: string;
  email: string;
  planId: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
}) {
  const { planId, ...tenantData } = data;

  return this.prisma.tenant.create({
    data: {
      ...tenantData,
      plan: {
        connect: { id: planId },
      },
    },
  });
}


  // ✅ Return planId also (needed for plan check)
  findTenant(id: string) {
    return this.prisma.tenant.findUnique({
      where: { id },
      select: {
        id: true,
        planId: true,
      },
    });
  }

  // ✅ Get master page with sections + fields
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

  // ✅ Check if page is allowed for plan
  async isPageAllowedForPlan(planId: string, pageId: string): Promise<boolean> {
    const count = await this.prisma.planPage.count({
      where: {
        planId,
        pageId,
      },
    });

    return count > 0;
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
