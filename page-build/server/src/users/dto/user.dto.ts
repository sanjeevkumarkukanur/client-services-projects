import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty( { example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty( { example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  // @IsOptional()
  // customFields?: Record<string, any>;
}
