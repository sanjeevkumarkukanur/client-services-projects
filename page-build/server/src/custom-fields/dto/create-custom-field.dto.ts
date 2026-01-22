import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCustomFieldDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  type: string;

  @IsBoolean()
  required: boolean;
}
