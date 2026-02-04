import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateFieldDto {
  @ApiProperty({ example: 'first-name', required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ example: 'First Name', required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 'text', required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    example: { placeholder: 'Enter your first name', maxLength: 50 },
    required: false,
  })
  @IsOptional()
  @IsObject()
  uiJson?: Record<string, any>;

  @ApiProperty({
    example: { backgroundColor: '#ffffff', padding: '20px' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  stylesJson?: Record<string, any>;

  @ApiProperty({ example: { required: true, minLength: 2 }, required: false })
  @IsOptional()
  @IsObject()
  validationJson?: Record<string, any>;
}
