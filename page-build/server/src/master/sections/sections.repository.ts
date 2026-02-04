import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    pageId: string;
    key: string;
    title: string;
    order: number;
    layoutJson: any;
    stylesJson: any;
  }) {
    return this.prisma.section.create({ data });
  }

  findByPage(pageId: string) {
    return this.prisma.section.findMany({
      where: { pageId },
      orderBy: { order: 'asc' },
      include: { fields: true },
    });
  }

  findById(id: string) {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  update(id: string, data: Partial<{
    title: string;
    order: number;
    layoutJson: any;
    stylesJson: any;
  }>) {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
