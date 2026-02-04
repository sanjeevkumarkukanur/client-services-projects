import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Fields')
@Controller('master/fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  create(@Body() dto: CreateFieldDto) {
    return this.fieldsService.create(dto);
  }

  // Get all fields of a section
  @Get('by-section/:sectionId')
  findBySection(@Param('sectionId') sectionId: string) {
    return this.fieldsService.findBySection(sectionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFieldDto) {
    return this.fieldsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(id);
  }
}
