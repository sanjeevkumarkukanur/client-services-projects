import { IsString, IsEmail, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Ravi Kumar' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ravi@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'IT' })
  @IsString()
  department: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(1)
  salary: number;
}
