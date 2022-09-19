import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterUserDto } from '../user/dto/registerUserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.findOne(email);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserDto: RegisterUserDto) {
    const userExist = await this.userService.findOne(registerUserDto.email);

    if (userExist) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const user = new UserEntity();
    registerUserDto.password = await hash(registerUserDto.password, 10);
    const { passwordConfirm, ...registerUserDtoWithoutPasswordConfirm } =
      registerUserDto;
    return this.userService.save(user, registerUserDtoWithoutPasswordConfirm);
  }

  login(user: Omit<UserEntity, 'password'>): { accessToken: string } {
    const payload = { email: user.email, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
