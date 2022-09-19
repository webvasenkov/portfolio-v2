import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProjectDto';
import { ProjectEntity } from './project.entity';
import { ToolEntity } from '../tool/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/updateProjectDto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRep: Repository<ProjectEntity>,
    @InjectRepository(ToolEntity)
    private readonly toolRep: Repository<ToolEntity>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = new ProjectEntity();
    await this.checkNameExists(createProjectDto.name);
    return this.save(project, createProjectDto);
  }

  findAll(): Promise<ProjectEntity[]> {
    return this.projectRep.find({ relations: ['tools'] });
  }

  async findOne(projectId: number): Promise<ProjectEntity> {
    const project = await this.projectRep.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new HttpException(
        'Project with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return project;
  }

  async update(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(projectId);
    await this.checkNameExists(updateProjectDto.name, projectId);
    return this.save(project, updateProjectDto);
  }

  async delete(projectId: number) {
    await this.findOne(projectId);
    this.projectRep.delete(projectId);
  }

  async checkNameExists(
    name: string,
    projectId?: number,
  ): Promise<HttpException | undefined> {
    const project = await this.projectRep.findOne({
      where: { name },
    });

    if (project && project.id !== projectId) {
      throw new HttpException(
        'Project with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    return undefined;
  }

  async save(
    project: ProjectEntity,
    dto: CreateProjectDto | UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const tools = await this.toolRep.findBy({
      id: In(dto.tools),
    });
    Object.assign(project, dto, { tools });
    return this.projectRep.save(project);
  }
}
