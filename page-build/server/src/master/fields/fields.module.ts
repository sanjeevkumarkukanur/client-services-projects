import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { FieldsRepository } from './fields.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FieldsController],
  providers: [FieldsService, FieldsRepository], // 👈 include repository
})
export class FieldsModule {}
