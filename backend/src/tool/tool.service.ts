import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolEntity } from './tool.entity';
import { CreateToolDto } from './dto/createToolDto';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
  ) {}

  async create(toolCreateDto: CreateToolDto): Promise<ToolEntity> {
    const existTool = await this.toolRepository.findBy({ name: toolCreateDto.name });

    if (existTool.length) {
      throw new HttpException('Tool already exists', HttpStatus.CONFLICT);
    }

    const tool = new ToolEntity();
    return this.save(tool, toolCreateDto);
  }

  save(tool: ToolEntity, dto: CreateToolDto): Promise<ToolEntity> {
    Object.assign(tool, dto);
    return this.toolRepository.save(tool);
  }
}
