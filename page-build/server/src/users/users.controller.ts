import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  // OWNER creates ADMIN/USER
  @Post()
  create(@Req() req, @Body() dto: CreateUserDto) {
    return this.service.createUser(req.user, dto);
  }

  // List users in tenant
  @Get()
  list(@Req() req) {
    return this.service.listUsers(req.user);
  }

  // OWNER updates user
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.updateUser(req.user, id, dto);
  }

  // OWNER deletes user
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.service.deleteUser(req.user, id);
  }
}
