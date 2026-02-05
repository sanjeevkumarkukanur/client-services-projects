import { Module } from '@nestjs/common';
import { TenantFieldsController } from './tenant-fields.controller';
import { TenantFieldsService } from './tenant-fields.service';
import { TenantFieldsRepository } from './tenant-fields.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TenantFieldsController],
  providers: [TenantFieldsService, TenantFieldsRepository],
  exports: [TenantFieldsRepository],
})
export class TenantFieldsModule {}
