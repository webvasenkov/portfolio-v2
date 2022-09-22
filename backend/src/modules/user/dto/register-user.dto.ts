import {
  IsEmail,
  Matches,
  IsString,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'password must have minimum 8 characters, at least one letter and one number',
  })
  password: string;

  @IsString()
  @Match('password', {message: "password dosen't match"})
  passwordConfirm: string;
}
