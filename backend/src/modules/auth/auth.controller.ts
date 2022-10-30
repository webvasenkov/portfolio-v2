import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any): { accessToken: string } {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<{ user: UserEntity }> {
    const user = await this.authService.register(registerUserDto);
    return { user }
  }
}
