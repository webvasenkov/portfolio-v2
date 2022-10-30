import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entites/project.entity';
import { ToolEntity } from '../tool/entities/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRep: Repository<ProjectEntity>,
    @InjectRepository(ToolEntity)
    private readonly toolRep: Repository<ToolEntity>,
    private readonly fileService: FileService,
  ) { }

  async create(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
  ): Promise<ProjectEntity> {
    await this.checkNameExists(createProjectDto.name);
    const project = new ProjectEntity();
    return this.save(project, createProjectDto, file);
  }

  findAll(): Promise<ProjectEntity[]> {
    return this.projectRep.find({ relations: ['tools'] });
  }

  async findOne(projectId: number): Promise<ProjectEntity> {
    const project = await this.projectRep.findOne({
      where: { id: projectId },
      relations: {tools: true}
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
    file: Express.Multer.File,
  ): Promise<ProjectEntity> {
    await this.checkNameExists(updateProjectDto.name, projectId);
    const project = await this.findOne(projectId);

    if (project.img) {
      await this.deleteImg(project);
    }

    return this.save(project, updateProjectDto, file);
  }

  async delete(projectId: number) {
    const project = await this.findOne(projectId);
    if (project.img) {
      await this.deleteImg(project);
    }
    this.projectRep.delete(projectId);
  }

  deleteImg(project: ProjectEntity): Promise<void> {
    const imgUrlArray = project.img.split('/')
    const imgName = imgUrlArray[imgUrlArray.length - 1];
    return this.fileService.delete(imgName);
  }

  async checkNameExists(
    name: string,
    projectId?: number,
  ): Promise<HttpException | undefined> {
    const project = await this.projectRep.findOne({
      where: { name: name || '' },
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
    file?: Express.Multer.File,
  ): Promise<ProjectEntity> {
    let tools = project.tools || []
    let imgUrl = project.img || '';


    if (dto.tools?.length) {
      tools = await this.toolRep.findBy({
        id: In(dto.tools),
      });
    }

    if (file) {
      try {
        imgUrl = await this.fileService.upload(file);
      } catch (err) {
        throw new HttpException(err.messsage, err.status);
      }
    }
    
    const newProject = {
      ...dto,
      tools,
      img: imgUrl,
    };

    Object.assign(project, newProject);
    return this.projectRep.save(project);
  }
}
