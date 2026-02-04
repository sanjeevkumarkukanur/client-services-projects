import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsString } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ example: 'section-id-123' })
  @IsString()
  sectionId: string;

  @ApiProperty({ example: 'first-name' })
  @IsString()
  key: string;

  @ApiProperty({ example: 'First Name' }) 
  @IsString()
  label: string;

  @ApiProperty({ example: 'text' })
  @IsString()
  type: string; // text, email, number, select, etc

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;

  @ApiProperty({ example: { "placeholder": "Enter your first name", "maxLength": 50 } })
  @IsObject()
  uiJson: Record<string, any>;

  @ApiProperty({ example: { "backgroundColor": "#ffffff", "padding": "20px" } })
  @IsObject()
  stylesJson: Record<string, any>;  

  @ApiProperty({ example: { "required": true, "minLength": 2 } })
  @IsObject()
  validationJson: Record<string, any>;
}
