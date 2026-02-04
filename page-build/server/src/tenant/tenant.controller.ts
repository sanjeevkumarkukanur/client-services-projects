import { Body, Controller, Param, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { EnablePageDto } from './dto/enable-page.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto);
  }

  @Post(':tenantId/enable-page')
  enablePage(
    @Param('tenantId') tenantId: string,
    @Body() dto: EnablePageDto,
  ) {
    return this.tenantService.enablePage(tenantId, dto);
  }
}
