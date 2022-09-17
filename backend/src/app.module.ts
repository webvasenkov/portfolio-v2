import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { ToolModule } from './tool/tool.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options as configOptions } from './config';
import { options as typeormOptions } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(typeormOptions),
    ProjectModule,
    ToolModule,
  ],
})
export class AppModule {}
