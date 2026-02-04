import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnablePageDto {
  @ApiProperty({ description: 'Key of the page to be enabled' })
  @IsString()
  pageKey: string; // e.g. "registration"
}
