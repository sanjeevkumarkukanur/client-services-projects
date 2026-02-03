import { IsOptional, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

}
