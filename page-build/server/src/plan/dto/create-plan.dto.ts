import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ description: 'Unique key for the plan' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Name of the plan' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Price of the plan in smallest currency unit' })
  @IsInt()
  price: number;

  @ApiProperty({ description: 'Currency of the plan price' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Description of the plan', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Is the plan active?' })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'List of master page IDs enabled for this plan',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pages?: string[];
}
