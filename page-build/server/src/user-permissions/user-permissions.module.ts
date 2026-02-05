import { Module } from '@nestjs/common';
import { UserPermissionsController } from './user-permissions.controller';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsRepository } from './user-permissions.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserPermissionsController],
  providers: [UserPermissionsService, UserPermissionsRepository],
  exports: [UserPermissionsRepository], // useful for PermissionGuard
})
export class UserPermissionsModule {}
