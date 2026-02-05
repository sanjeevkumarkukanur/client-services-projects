import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';
import { SetUserPermissionDto } from './dto/set-user-permission.dto';

@Controller('users/:userId/permissions')
export class UserPermissionsController {
  constructor(private readonly service: UserPermissionsService) {}

  // Set or update override (allow/deny)
  @Post()
  setPermission(
    @Param('userId') userId: string,
    @Body() dto: SetUserPermissionDto,
  ) {
    return this.service.setPermission(userId, dto);
  }

  // List all overrides for user
  @Get()
  getUserPermissions(@Param('userId') userId: string) {
    return this.service.getUserPermissions(userId);
  }

  // Remove override (falls back to role permissions)
  @Delete(':permissionId')
  removePermission(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.service.removePermission(userId, permissionId);
  }
}
