import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolEntity } from './tool.entity';
import { CreateToolDto } from './dto/createToolDto';
import { UpdateToolDto } from './dto/updateToolDto';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
  ) {}

  async create(createToolDto: CreateToolDto): Promise<ToolEntity> {
    await this.checkExist(createToolDto);
    const tool = new ToolEntity();
    return this.save(tool, createToolDto);
  }

  findAll(): Promise<ToolEntity[]> {
    return this.toolRepository.find();
  }

  async update(
    idTool: number,
    updateToolDto: UpdateToolDto,
  ): Promise<ToolEntity> {
    const tool = await this.toolRepository.findOne({ where: { id: idTool } });

    if (!tool) {
      throw new HttpException("Tool by this id dosen't exist", HttpStatus.NOT_FOUND);
    }

    await this.checkExist(updateToolDto);
    return this.save(tool, updateToolDto);
  }

  async checkExist(dto: CreateToolDto | UpdateToolDto): Promise<void> {
    const existTool = await this.toolRepository.findOne({
      where: { name: dto.name },
    });

    if (existTool) {
      throw new HttpException('Tool with this name already exists', HttpStatus.CONFLICT);
    }

    return undefined;
  }

  save(
    tool: ToolEntity,
    dto: CreateToolDto | UpdateToolDto,
  ): Promise<ToolEntity> {
    Object.assign(tool, dto);
    return this.toolRepository.save(tool);
  }
}
