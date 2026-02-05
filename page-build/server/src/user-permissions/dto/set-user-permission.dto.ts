import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SetUserPermissionDto {
    @ApiProperty({
        example: 'perm-123',
        description: 'The ID of the permission to set, e.g. "perm-123"',
    })
  @IsString()
  permissionId: string;

    @ApiProperty({
        example: true,
        description: 'Whether the permission is allowed (true) or denied (false)',
    })
  @IsBoolean()
  allowed: boolean; // true = allow, false = deny
}
