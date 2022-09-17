import { Controller, Post, Body } from '@nestjs/common';
import { CreateToolDto } from './dto/createToolDto';
import { ToolEntity } from './tool.entity';
import { ToolService } from './tool.service';

@Controller()
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('tool')
  async create(@Body() createToolDto: CreateToolDto): Promise<{ tool: ToolEntity }> {
    const tool = await this.toolService.create(createToolDto);
    return { tool };
  }
}
