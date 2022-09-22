import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolEntity } from './entities/tool.entity';
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

  @Public()
  @Get('tools')
  async findAll(): Promise<{ tools: ToolEntity[] }> {
    const tools = await this.toolService.findAll();
    return { tools };
  }

  @Put('tool/:id')
  async update(
    @Param('id', ParseIntPipe) toolId: number,
    @Body() updateToolDto: UpdateToolDto,
  ): Promise<{ tool: ToolEntity }> {
    const tool = await this.toolService.update(toolId, updateToolDto);
    return { tool };
  }

  @Delete('tool/:id')
  async delete(@Param('id', ParseIntPipe) toolId: number): Promise<{result: string}> {
    await this.toolService.delete(toolId);
    return {result: 'success'}
  }
}
