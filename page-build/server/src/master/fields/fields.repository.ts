import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FieldsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    sectionId: string;
    key: string;
    label: string;
    type: string;
    order: number;
    uiJson: any;
    stylesJson: any; 
    validationJson: any;
  }) {
    return this.prisma.field.create({ data });
  }

  findBySection(sectionId: string) {
    return this.prisma.field.findMany({
      where: { sectionId },
      orderBy: { order: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.field.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Partial<{
      label: string;
      type: string;
      order: number;
      uiJson: any;
      stylesJson: any;
      validationJson: any;
    }>,
  ) {
    return this.prisma.field.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.field.delete({ where: { id } });
  }
}
