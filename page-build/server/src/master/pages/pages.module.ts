import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PagesRepository } from './pages.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
