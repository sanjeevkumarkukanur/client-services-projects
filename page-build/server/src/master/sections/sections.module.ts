import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SectionsRepository } from './sections.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SectionsController],
  providers: [SectionsService, SectionsRepository],
})
export class SectionsModule {}
