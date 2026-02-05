import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({
        example: 'employee.create',
        description: 'The unique key for the permission, e.g. "employee.create"',
    })
  @IsString()
  key: string; // e.g. "employee.create"

  @ApiProperty({
    example: 'Create Employee',
    description: 'The human-readable name for the permission, e.g. "Create Employee"',
  })
  @IsString()
  name: string; // e.g. "Create Employee"
}
