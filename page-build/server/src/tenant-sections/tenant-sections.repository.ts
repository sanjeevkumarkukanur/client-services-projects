import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantSectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByPage(tenantPageId: string) {
    return this.prisma.tenantSection.findMany({
      where: { tenantPageId },
      include: { fields: true },
      orderBy: { order: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.tenantSection.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.tenantSection.update({
      where: { id },
      data,
    });
  }
}
