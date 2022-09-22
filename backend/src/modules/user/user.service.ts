import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
  ) {}

  findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRep.findOne({ where: { email } });
  }

  save(
    user: UserEntity,
    dto: Omit<RegisterUserDto, 'passwordConfirm'>,
  ): Promise<UserEntity> {
    Object.assign(user, dto);
    return this.userRep.save(user);
  }
}
