import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignPermissionDto {
    @ApiProperty({
        example: 'perm-123',
        description: 'The ID of the permission to assign, e.g. "perm-123"',
    })
  @IsString()
  permissionId: string;
}
