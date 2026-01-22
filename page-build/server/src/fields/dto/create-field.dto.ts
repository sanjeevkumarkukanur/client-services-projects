import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { FieldType } from '../enums/field-type.enum';

export class CreateFieldDto {
  @ApiProperty({ example: 'First Name' })
  @IsString()
  label: string;

  @ApiProperty({ enum: FieldType })
  @IsEnum(FieldType)
  type: FieldType;

  @ApiProperty({ required: false })
  @IsOptional()
  validations?: Record<string, any>;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  sectionId: string;
}
