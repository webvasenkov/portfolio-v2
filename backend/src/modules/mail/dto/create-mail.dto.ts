import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateMailDto {

  @MinLength(1)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(2)
  @IsString()
  text: string;
}
