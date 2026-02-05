import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTenantPageDto {
    @ApiProperty({
        example: 'Home Page',
        description: 'The name of the tenant page, e.g. "Home Page"',
    })
  @IsOptional()
  @IsString()
  name?: string;
}
