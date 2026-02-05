import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly repo: PermissionsRepository) {}

  create(dto: CreatePermissionDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }
}
