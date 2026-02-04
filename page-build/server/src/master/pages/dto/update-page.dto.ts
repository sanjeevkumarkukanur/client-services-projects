import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePageDto {
  @ApiProperty({ example: 'home-page', required: false })
  @IsString()
  key?: string;

  @ApiProperty({ example: 'Home Page', required: false })
  @IsString()
  name?: string;
  
  @ApiProperty({ example: 'This is the main landing page', required: false })
  @IsString()
  description?: string;
}
