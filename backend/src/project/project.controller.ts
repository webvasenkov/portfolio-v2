import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProjectDto';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('project')
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<{ project: ProjectEntity }> {
    const project = await this.projectService.create(createProjectDto);
    return { project };
  }

  @Get('projects')
  async findAll(): Promise<{ projects: ProjectEntity[] }> {
    const projects = await this.projectService.findAll();
    return { projects };
  }
}
