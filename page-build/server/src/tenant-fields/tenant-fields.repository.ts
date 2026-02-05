import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantFieldsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findBySection(tenantSectionId: string) {
    return this.prisma.tenantField.findMany({
      where: { tenantSectionId },
      orderBy: { order: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.tenantField.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.tenantField.update({
      where: { id },
      data,
    });
  }
}
