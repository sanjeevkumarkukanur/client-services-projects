import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ description: 'Name of the tenant' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email of the tenant' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Plan ID for the tenant' })
  @IsString()
  planId: string; // 👈 REQUIRED

  @ApiProperty({ description: 'Phone number of the tenant', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Website of the tenant', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'Address of the tenant', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'City of the tenant', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  // @ApiProperty({ description: 'State of the tenant', required: false })
  // @IsOptional()
  // @IsString()
  // state?: string;

  // @ApiProperty({ description: 'Zip code of the tenant', required: false })
  // @IsOptional()
  // @IsString()
  // zipCode?: string;

  @ApiProperty({ description: 'Country of the tenant', required: false }) 
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'user name of the tenant', required: false })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({ description: 'Password for the tenant', required: false })
  @IsOptional()
  @IsString()
  password: string;
}
