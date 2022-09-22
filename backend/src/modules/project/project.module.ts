import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '../tool/entities/tool.entity';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entites/project.entity';
import { ProjectService } from './project.service';
import { appGuard } from 'src/lib/helper';
import { FileService } from '../file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ToolEntity])],
  controllers: [ProjectController],
  providers: [ProjectService, FileService, appGuard],
})
export class ProjectModule {}
