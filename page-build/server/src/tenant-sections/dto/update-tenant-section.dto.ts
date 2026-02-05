import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTenantSectionDto {
    @ApiProperty({
        example: 'Employee Details',
        description: 'The name of the tenant section, e.g. "Employee Details"',
    })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: { type: 'card', title: 'Employee Details' },
    description: 'The UI configuration for the tenant section, e.g. { type: "card", title: "Employee Details" }',
  })        
  @IsOptional()
  layoutJson?: any;

  @ApiProperty({
    example: { backgroundColor: '#fff', padding: '20px' },
    description: 'The style configuration for the tenant section, e.g. { backgroundColor: "#fff", padding: "20px" }',
  })
  @IsOptional()
  stylesJson?: any;

  @ApiProperty({
    example: 1,
    description: 'The order of the tenant section within its page, e.g. 1 for the first section, 2 for the second section, etc.',
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
