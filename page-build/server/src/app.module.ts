import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PagesModule } from './master/pages/pages.module';
import { SectionsModule } from './master/sections/sections.module';
import { FieldsModule } from './master/fields/fields.module';
import { TenantModule } from './tenant/tenant.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    PlanModule,
    TenantModule,
    PrismaModule,
    UsersModule,
    PagesModule,
    SectionsModule,
    FieldsModule,
  ],
})
export class AppModule {}
