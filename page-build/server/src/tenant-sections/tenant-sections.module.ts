import { Module } from '@nestjs/common';
import { TenantSectionsController } from './tenant-sections.controller';
import { TenantSectionsService } from './tenant-sections.service';
import { TenantSectionsRepository } from './tenant-sections.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TenantSectionsController],
  providers: [TenantSectionsService, TenantSectionsRepository],
  exports: [TenantSectionsRepository],
})
export class TenantSectionsModule {}
