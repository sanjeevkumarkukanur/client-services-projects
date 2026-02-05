import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TenantPagesService } from './tenant-pages.service';
import { UpdateTenantPageDto } from './dto/update-tenant-page.dto';

@Controller('tenant-pages')
export class TenantPagesController {
  constructor(private readonly service: TenantPagesService) {}

  @Get('/tenant/:tenantId')
  getByTenant(@Param('tenantId') tenantId: string) {
    return this.service.getByTenant(tenantId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantPageDto) {
    return this.service.update(id, dto);
  }
}
