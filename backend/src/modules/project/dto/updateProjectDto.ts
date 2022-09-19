import { IsString,  IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsNumber({}, {each: true})
  tools: number[];
}
