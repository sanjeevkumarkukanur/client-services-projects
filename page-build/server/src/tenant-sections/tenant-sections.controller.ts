import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TenantSectionsService } from './tenant-sections.service';
import { UpdateTenantSectionDto } from './dto/update-tenant-section.dto';

@Controller('tenant-sections')
export class TenantSectionsController {
  constructor(private readonly service: TenantSectionsService) {}

  @Get('/page/:tenantPageId')
  getByPage(@Param('tenantPageId') tenantPageId: string) {
    return this.service.getByPage(tenantPageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenantSectionDto) {
    return this.service.update(id, dto);
  }
}
