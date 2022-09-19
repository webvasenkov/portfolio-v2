import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateToolDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
