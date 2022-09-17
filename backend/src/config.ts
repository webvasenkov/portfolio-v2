import { ConfigModuleOptions } from '@nestjs/config';
import { join } from 'path';

export const options: ConfigModuleOptions = {
  envFilePath: [join(__dirname, '..', '.env')],
};
