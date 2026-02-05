import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantPagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByTenant(tenantId: string) {
    return this.prisma.tenantPage.findMany({
      where: { tenantId },
      include: {
        sections: {
          include: {
            fields: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.tenantPage.findUnique({
      where: { id },
      include: {
        sections: {
          include: { fields: true },
        },
      },
    });
  }

  update(id: string, data: { name?: string }) {
    return this.prisma.tenantPage.update({
      where: { id },
      data,
    });
  }
}
