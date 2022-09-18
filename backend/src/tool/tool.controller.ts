import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateToolDto } from './dto/createToolDto';
import { UpdateToolDto } from './dto/updateToolDto';
import { ToolEntity } from './tool.entity';
import { ToolService } from './tool.service';

@Controller()
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('tool')
  async create(
    @Body() createToolDto: CreateToolDto,
  ): Promise<{ tool: ToolEntity }> {
    const tool = await this.toolService.create(createToolDto);
    return { tool };
  }

  @Get('tools')
  async findAll(): Promise<{ tools: ToolEntity[] }> {
    const tools = await this.toolService.findAll();
    return { tools };
  }

  @Put('tool/:id')
  async update(
    @Param('id', ParseIntPipe) idTool: number,
    @Body() updateToolDto: UpdateToolDto,
  ): Promise<{ tool: ToolEntity }> {
    const tool = await this.toolService.update(idTool, updateToolDto);
    return { tool };
  }
}
