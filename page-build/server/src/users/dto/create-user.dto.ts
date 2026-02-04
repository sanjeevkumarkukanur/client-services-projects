import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string; // temporary or real password

  @IsOptional()
  @IsString()
  name?: string;

  @IsIn(['ADMIN', 'USER'])
  role: 'ADMIN' | 'USER'; // OWNER should not be created via this API
}
