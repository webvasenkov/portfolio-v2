import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '../tool/tool.entity';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { appGuard } from 'src/lib/helper';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ToolEntity])],
  controllers: [ProjectController],
  providers: [ProjectService, appGuard],
})
export class ProjectModule {}
