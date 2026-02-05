import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    PrismaModule,
    PermissionsModule, // optional now, useful later for guards/validation
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesRepository], // export if User/Auth needs it later
})
export class RolesModule {}
