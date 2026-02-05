import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class RolesService {
  constructor(private readonly repo: RolesRepository) {}

  create(dto: CreateRoleDto) {
    return this.repo.createRole(dto);
  }

  async assignPermission(roleId: string, dto: AssignPermissionDto) {
    const role = await this.repo.findById(roleId);
    if (!role) throw new NotFoundException('Role not found');

    return this.repo.addPermissionToRole(roleId, dto.permissionId);
  }

  getByTenant(tenantId: string) {
    return this.repo.getRolesByTenant(tenantId);
  }
}
