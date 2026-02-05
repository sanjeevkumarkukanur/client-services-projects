import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPermissionsRepository } from './user-permissions.repository';
import { SetUserPermissionDto } from './dto/set-user-permission.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserPermissionsService {
  constructor(
    private readonly repo: UserPermissionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async setPermission(userId: string, dto: SetUserPermissionDto) {
    // Optional safety checks
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const perm = await this.prisma.permission.findUnique({
      where: { id: dto.permissionId },
    });
    if (!perm) throw new NotFoundException('Permission not found');

    return this.repo.upsertUserPermission({
      userId,
      permissionId: dto.permissionId,
      allowed: dto.allowed,
    });
  }

  removePermission(userId: string, permissionId: string) {
    return this.repo.deleteUserPermission(userId, permissionId);
  }

  getUserPermissions(userId: string) {
    return this.repo.findByUser(userId);
  }
}
