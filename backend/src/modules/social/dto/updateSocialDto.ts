import { IsString, IsNotEmpty  } from 'class-validator';

export class UpdateSocialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
