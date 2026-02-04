import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AssignPlanDto } from './dto/assign-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly repo: PlanRepository) {}

  createPlan(dto: CreatePlanDto) {
    return this.repo.createPlan(dto);
  }

  getAllPlans() {
    return this.repo.getAllPlans();
  }

  updatePlan(planId: string, dto: UpdatePlanDto) {
    return this.repo.updatePlan(planId, dto);
  }

  addPageToPlan(planId: string, pageId: string) {
    return this.repo.addPageToPlan(planId, pageId);
  }

  assignPlanToTenant(tenantId: string, dto: AssignPlanDto) {
    return this.repo.assignPlanToTenant(tenantId, dto.planId);
  }

  async getPlan(planId: string) {
    const plan = await this.repo.getPlanWithPages(planId);
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }
}
