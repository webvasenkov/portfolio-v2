import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from './tool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToolEntity])],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
