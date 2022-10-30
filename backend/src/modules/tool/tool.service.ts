import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolEntity } from './entities/tool.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRep: Repository<ToolEntity>,
  ) {}

  async create(createToolDto: CreateToolDto): Promise<ToolEntity> {
    await this.checkNameExists(createToolDto.name);
    const tool = new ToolEntity();
    return this.save(tool, createToolDto);
  }

  findAll(): Promise<ToolEntity[]> {
    return this.toolRep.find();
  }

  async findOne(toolId: number): Promise<ToolEntity> {
    const tool = await this.toolRep.findOne({ where: { id: toolId } });

    if (!tool) {
      throw new HttpException(
        'Tool with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return tool;
  }

  async update(
    toolId: number,
    updateToolDto: UpdateToolDto,
  ): Promise<ToolEntity> {
    await this.checkNameExists(updateToolDto.name, toolId);
    const tool = await this.findOne(toolId);
    return this.save(tool, updateToolDto);
  }

  async delete(toolId: number) {
    await this.findOne(toolId);
    this.toolRep.delete(toolId);
  }

  async checkNameExists(name: string, toolId?: number): Promise<HttpException | undefined> {
    const tool = await this.toolRep.findOne({
      where: { name },
    });

    if (tool && tool.id !== toolId) {
      throw new HttpException(
        'Tool with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    return undefined;
  }

  save(
    tool: ToolEntity,
    dto: CreateToolDto | UpdateToolDto,
  ): Promise<ToolEntity> {
    Object.assign(tool, dto);
    return this.toolRep.save(tool);
  }
}
