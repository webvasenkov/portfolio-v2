import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project/project.module';
import { ToolModule } from '../tool/tool.module';
import { SocialModule } from '../social/social.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { FileModule } from '../file/file.module';
import { configModuleOptions } from 'src/config';
import { dataSourceOptions } from 'src/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProjectModule,
    ToolModule,
    SocialModule,
    UserModule,
    AuthModule,
    MailModule,
    FileModule
  ],
})
export class AppModule {}
