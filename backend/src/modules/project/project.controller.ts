import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createProjectDto';
import { UpdateProjectDto } from './dto/updateProjectDto';
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

  @Put('project/:id')
  async update(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<{ project: ProjectEntity }> {
    const project = await this.projectService.update(
      projectId,
      updateProjectDto,
    );
    return { project };
  }

  @Delete('project/:id')
  async delete(@Param('id', ParseIntPipe) projectId: number): Promise<{result: string}> {
    await this.projectService.delete(projectId);
    return {result: 'success'}
  }
}
