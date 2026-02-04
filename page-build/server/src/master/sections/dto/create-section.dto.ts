import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsString } from 'class-validator';

export class CreateSectionDto {
    @ApiProperty({ example: 'page-id-123' })    
  @IsString()
  pageId: string;

@ApiProperty({ example: 'header-section' }) 
  @IsString()
  key: string;

  @ApiProperty({ example: 'Header Section' })
  @IsString()
  title: string;

    @ApiProperty({ example: 1 })
  @IsInt()
  order: number;
    @ApiProperty({ example: { "type": "header", "content": "Welcome to our site!" } })
  @IsObject()
  layoutJson: Record<string, any>;

    @ApiProperty({ example: { "backgroundColor": "#ffffff", "padding": "20px" } })
  @IsObject()
  stylesJson: Record<string, any>;
}
