import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'; // or 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  // OWNER creates ADMIN/USER
  async createUser(currentUser: any, dto: CreateUserDto) {
    if (currentUser.role !== 'OWNER') {
      throw new ForbiddenException('Only OWNER can create users');
    }

    const existing = await this.repo.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.repo.createUser({
      email: dto.email,
      password: hashed,
      name: dto.name,
      role: dto.role, // ADMIN or USER
      tenantId: currentUser.tenantId, // 👈 same tenant
    });

    // Don’t return password
    const { password, ...safe } = user as any;
    return safe;
  }

  // List users in same tenant
  async listUsers(currentUser: any) {
    return this.repo.findByTenant(currentUser.tenantId);
  }

  // Update user (OWNER only)
  async updateUser(currentUser: any, userId: string, dto: UpdateUserDto) {
    if (currentUser.role !== 'OWNER') {
      throw new ForbiddenException('Only OWNER can update users');
    }

    // Optional: ensure the user belongs to same tenant (extra safety)
    const users = await this.repo.findByTenant(currentUser.tenantId);
    const exists = users.find((u) => u.id === userId);
    if (!exists) {
      throw new NotFoundException('User not found in your tenant');
    }

    return this.repo.updateUser(userId, dto);
  }

  // Delete user (OWNER only)
  async deleteUser(currentUser: any, userId: string) {
    if (currentUser.role !== 'OWNER') {
      throw new ForbiddenException('Only OWNER can delete users');
    }

    // Same-tenant safety check
    const users = await this.repo.findByTenant(currentUser.tenantId);
    const exists = users.find((u) => u.id === userId);
    if (!exists) {
      throw new NotFoundException('User not found in your tenant');
    }

    return this.repo.deleteUser(userId);
  }
}
