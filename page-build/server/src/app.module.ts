import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PagesModule } from './master/pages/pages.module';
import { SectionsModule } from './master/sections/sections.module';
import { FieldsModule } from './master/fields/fields.module';
import { TenantModule } from './tenant/tenant.module';
import { PlanModule } from './plan/plan.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { TenantPagesModule } from './tenant-pages/tenant-pages.module';
import { TenantSectionsModule } from './tenant-sections/tenant-sections.module';
import { TenantFieldsModule } from './tenant-fields/tenant-fields.module';

@Module({
  imports: [
    TenantPagesModule,
    TenantSectionsModule,
    TenantFieldsModule,
    PermissionsModule,
    RolesModule,
    UserPermissionsModule,
    AuthModule,
    PlanModule,
    TenantModule,
    UsersModule,
    PrismaModule,
    PagesModule,
    SectionsModule,
    FieldsModule,
  ],
})
export class AppModule {}
