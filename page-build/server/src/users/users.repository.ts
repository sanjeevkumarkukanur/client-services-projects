// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class UsersRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   // Find user by email and include tenant (to get planId)
//   findByEmail(email: string) {
//     return this.prisma.user.findUnique({
//       where: { email },
//       include: {
//         tenant: {
//           select: {
//             id: true,
//             planId: true,
//           },
//         },
//       },
//     });
//   }

//   // Optional helper if you need it elsewhere
//   createUser(data: {
//     email: string;
//     password: string;
//     name?: string;
//     role: string;
//     tenantId: string;
//   }) {
//     return this.prisma.user.create({ data });
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        tenant: {
          select: {
            id: true,
            planId: true,
          },
        },
      },
    });
  }
  findByTenant(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        tenantId: true,
        createdAt: true,
      },
    });
  }

  createUser(data: {
    email: string;
    password: string;
    name?: string;
    role: string;
    tenantId: string;
  }) {
    return this.prisma.user.create({ data });
  }

  updateUser(userId: string, data: { name?: string; role?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        tenantId: true,
        createdAt: true,
      },
    });
  }

  deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
      select: { id: true },
    });
  }
}
