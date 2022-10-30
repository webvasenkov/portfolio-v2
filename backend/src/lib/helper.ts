import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/modules/auth/strategies/jwt/jwt-auth.guard';

export const appGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const fileValidators = [
  new FileTypeValidator({ fileType: /jpeg|jpg|png/ }),
  new MaxFileSizeValidator({ maxSize: 2000000 }),
];
