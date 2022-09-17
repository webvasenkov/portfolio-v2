import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { join } from 'path';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: [join(__dirname, '..', '.env')],
};

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  // custom represnt for exceptions
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new BadRequestException(
      validationErrors.map((err) => ({
        [err.property]: Object.keys(err.constraints).map(
          (key) => err.constraints[key],
        ),
      })),
    );
  },
};
