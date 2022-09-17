import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { ToolModule } from './tool/tool.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './config';
import { dataSourceOptions } from './typeorm.config';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProjectModule,
    ToolModule,
    SocialModule,
  ],
})
export class AppModule {}
