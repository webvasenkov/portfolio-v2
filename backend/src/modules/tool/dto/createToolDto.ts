import { IsString, IsNotEmpty } from 'class-validator';

export class CreateToolDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
