import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/modules/auth/strategies/jwt/jwt-auth.guard';

export const appGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
