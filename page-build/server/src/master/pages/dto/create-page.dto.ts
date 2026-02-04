import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ example: 'home-page' })
  @IsString()
  key: string;

  @ApiProperty({ example: 'Home Page' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'This is the main landing page', required: false })
  @IsString()
  description?: string;
}
