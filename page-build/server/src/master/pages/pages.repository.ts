import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { key: string; name: string; description?: string }) {
    return this.prisma.page.create({ data });
  }

  findAll() {
    return this.prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: { fields: { orderBy: { order: 'asc' } } },
        },
      },
    });
  }

  update(id: string, data: { name?: string; description?: string }) {
    return this.prisma.page.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.page.delete({ where: { id } });
  }
}
