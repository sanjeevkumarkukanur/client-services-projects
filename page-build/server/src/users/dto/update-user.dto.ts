import { IsOptional, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsObject()
  customFields?: Record<string, any>;
}
