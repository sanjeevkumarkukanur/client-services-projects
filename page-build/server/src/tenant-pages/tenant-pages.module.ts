import { Module } from '@nestjs/common';
import { TenantPagesController } from './tenant-pages.controller';
import { TenantPagesService } from './tenant-pages.service';
import { TenantPagesRepository } from './tenant-pages.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TenantPagesController],
  providers: [TenantPagesService, TenantPagesRepository],
  exports: [TenantPagesRepository],
})
export class TenantPagesModule {}
