import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
    @ApiProperty({ example: 'header-section', required: false })
    @IsOptional()
    @IsString()
    key?: string;

    @ApiProperty({ example: 'Header Section', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    order?: number;

    @ApiProperty({ example: { "type": "header", "content": "Welcome to our site!" }, required: false })
    @IsOptional()
    @IsObject()
    layoutJson?: Record<string, any>;

    @ApiProperty({ example: { "backgroundColor": "#ffffff", "padding": "20px" }, required: false })
    @IsOptional()
    @IsObject()
    stylesJson?: Record<string, any>;
}
