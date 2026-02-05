import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        example: 'ADMIN',
        description: 'The name of the role, e.g. "ADMIN", "HR"',
    })
  @IsString()
  name: string; // "ADMIN", "HR"

  @ApiProperty({
    example: 'tenant-123',
    description: 'The ID of the tenant this role belongs to, e.g. "tenant-123"',
  })
  @IsString()
  tenantId: string;
}
