import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsObject()
  customFields?: Record<string, any>;
}
