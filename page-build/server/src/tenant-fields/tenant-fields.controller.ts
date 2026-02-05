import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TenantFieldsService } from './tenant-fields.service';
import { UpdateTenantFieldDto } from './dto/update-tenant-field.dto';

@Controller('tenant-fields')
export class TenantFieldsController {
  constructor(private readonly service: TenantFieldsService) {}

  @Get('/section/:tenantSectionId')
  getBySection(@Param('tenantSectionId') tenantSectionId: string) {
    return this.service.getBySection(tenantSectionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantFieldDto) {
    return this.service.update(id, dto);
  }
}
