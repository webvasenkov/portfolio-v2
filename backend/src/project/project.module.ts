import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from 'src/tool/tool.entity';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ToolEntity])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
