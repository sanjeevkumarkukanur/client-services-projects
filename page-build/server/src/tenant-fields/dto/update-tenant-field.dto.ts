import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateTenantFieldDto {
    @ApiProperty({
        example: { type: 'text', label: 'First Name' },
        description: 'The UI configuration for the tenant field, e.g. { type: "text", label: "First Name" }',
    })
  @IsOptional()
  uiJson?: any;

  @ApiProperty({
    example: { required: true, maxLength: 50 },
    description: 'The validation rules for the tenant field, e.g. { required: true, maxLength: 50 }',
  })
  @IsOptional()
  stylesJson?: any;

@ApiProperty({
    example: { required: true, maxLength: 50 },
    description: 'The validation rules for the tenant field, e.g. { required: true, maxLength: 50 }',
  })
  @IsOptional()
  validationJson?: any;

@ApiProperty({
    example: 1,
    description: 'The order of the tenant field within its section, e.g. 1 for the first field, 2 for the second field, etc.',
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
