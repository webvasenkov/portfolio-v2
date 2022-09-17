import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  tools: string[];
}
