import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Create plan + optional pages
  async createPlan(dto: {
    key: string;
    name: string;
    price: number;
    currency: string;
    description?: string;
    isActive: boolean;
    pages?: string[];
  }) {
    const { pages, ...planData } = dto;

    const plan = await this.prisma.plan.create({
      data: {
        ...planData,
      },
    });

    if (Array.isArray(pages) && pages.length > 0) {
      await this.prisma.planPage.createMany({
        data: pages.map((pageId) => ({
          planId: plan.id,
          pageId,
        })),
      });
    }

    return this.getPlanWithPages(plan.id);
  }

  // get all plans
  getAllPlans() {
    return this.prisma.plan.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        pages: {
          include: {
            page: true, // master page details
          },
        },
      },
    });
  }

  // ✅ Update plan + replace pages if provided
  async updatePlan(planId: string, dto: any) {
    const { pages, ...planData } = dto;

    await this.prisma.plan.update({
      where: { id: planId },
      data: {
        ...planData,
      },
    });

    if (Array.isArray(pages)) {
      // remove old mappings
      await this.prisma.planPage.deleteMany({
        where: { planId },
      });

      // add new mappings
      if (pages.length > 0) {
        await this.prisma.planPage.createMany({
          data: pages.map((pageId: string) => ({
            planId,
            pageId,
          })),
        });
      }
    }

    return this.getPlanWithPages(planId);
  }

  addPageToPlan(planId: string, pageId: string) {
    return this.prisma.planPage.create({
      data: { planId, pageId },
    });
  }

  assignPlanToTenant(tenantId: string, planId: string) {
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: { planId },
    });
  }

  getPlanWithPages(planId: string) {
    return this.prisma.plan.findUnique({
      where: { id: planId },
      include: {
        pages: {
          include: {
            page: true, // master page
          },
        },
      },
    });
  }
}
