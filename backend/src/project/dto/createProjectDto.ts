import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber({}, {each: true})
  @IsNotEmpty()
  tools: number[];
}
