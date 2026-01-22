import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomFieldsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.customField.create({ data });
  }

  findAll() {
    return this.prisma.customField.findMany();
  }
}
