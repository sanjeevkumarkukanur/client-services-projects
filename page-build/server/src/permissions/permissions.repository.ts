import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { key: string; name: string }) {
    return this.prisma.permission.create({ data });
  }

  findAll() {
    return this.prisma.permission.findMany();
  }

  findByKey(key: string) {
    return this.prisma.permission.findUnique({ where: { key } });
  }
}
