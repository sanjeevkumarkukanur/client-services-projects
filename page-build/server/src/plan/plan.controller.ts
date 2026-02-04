import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AssignPlanDto } from './dto/assign-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Plans')
@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.planService.createPlan(dto);
  }
  
  @Get() // 👈 GET ALL PLANS
  getAllPlans() {
    return this.planService.getAllPlans();
  }

  @Patch(':planId')
  update(@Param('planId') planId: string, @Body() dto: UpdatePlanDto) {
    return this.planService.updatePlan(planId, dto);
  }

  // Add single master page to plan (optional helper)
  @Post(':planId/pages/:pageId')
  addPageToPlan(
    @Param('planId') planId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.planService.addPageToPlan(planId, pageId);
  }

  // Assign plan to tenant
  @Post('/assign/:tenantId')
  assignPlan(@Param('tenantId') tenantId: string, @Body() dto: AssignPlanDto) {
    return this.planService.assignPlanToTenant(tenantId, dto);
  }

  @Get(':planId')
  getPlan(@Param('planId') planId: string) {
    return this.planService.getPlan(planId);
  }
}
