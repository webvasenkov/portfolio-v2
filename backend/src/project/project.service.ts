import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProjectDto';
import { ProjectEntity } from './project.entity';
import { ToolEntity } from '../tool/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = new ProjectEntity();
    return this.save(project, createProjectDto);
  }

  findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.find({ relations: ['tools'] });
  }

  async save(
    project: ProjectEntity,
    dto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const tools = await this.toolRepository.findBy({
      id: In(dto.tools),
    });

    Object.assign(project, dto, { tools });
    return this.projectRepository.save(project);
  }
}
