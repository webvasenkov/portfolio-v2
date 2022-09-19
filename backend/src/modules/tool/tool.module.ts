import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from './tool.entity';
import { appGuard } from 'src/lib/helper';

@Module({
  imports: [TypeOrmModule.forFeature([ToolEntity])],
  controllers: [ToolController],
  providers: [ToolService, appGuard],
})
export class ToolModule {}
