import {IsNotEmpty, IsString} from 'class-validator'

export class CreateSocialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
