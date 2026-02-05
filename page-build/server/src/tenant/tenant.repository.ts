import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- Tenant ----------
  createTenant(data: {
    name: string;
    email: string;
    planId?: string;
    phone?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
  }) {
    return this.prisma.tenant.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address: data.address,
        city: data.city,
        country: data.country,
        ...(data.planId
          ? { plan: { connect: { id: data.planId } } }
          : {}),
      },
    });
  }

  findTenant(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  // ---------- Plan → Pages ----------
  getAutoEnabledPagesForPlan(planId: string) {
    return this.prisma.planPage.findMany({
      where: {
        planId,
        autoEnable: true,
      },
      include: {
        page: {
          include: {
            sections: {
              orderBy: { order: 'asc' },
              include: {
                fields: { orderBy: { order: 'asc' } },
              },
            },
          },
        },
      },
    });
  }

  isPageAllowedForPlan(planId: string, pageId: string) {
    return this.prisma.planPage
      .findUnique({
        where: {
          planId_pageId: {
            planId,
            pageId,
          },
        },
      })
      .then(Boolean);
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

  // ---------- Tenant Pages ----------
  createTenantPage(data: { tenantId: string; pageKey: string; name: string }) {
    return this.prisma.tenantPage.create({ data });
  }

  tenantHasPage(tenantId: string, pageKey: string) {
    return this.prisma.tenantPage
      .findFirst({
        where: { tenantId, pageKey },
      })
      .then(Boolean);
  }

  // ---------- Tenant Sections ----------
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

  // ---------- Tenant Fields ----------
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
