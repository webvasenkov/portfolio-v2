import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';
import { fileValidators } from 'src/lib/helper';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entites/project.entity';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('project')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile(
      new ParseFilePipe({ validators: fileValidators, fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ): Promise<{ project: ProjectEntity }> {
    const project = await this.projectService.create(createProjectDto, file);
    return { project };
  }

  @Public()
  @Get('projects')
  async findAll(): Promise<{ projects: ProjectEntity[] }> {
    const projects = await this.projectService.findAll();
    return { projects };
  }

  @Put('project/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile(
      new ParseFilePipe({ validators: fileValidators, fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ): Promise<{ project: ProjectEntity }> {
    const project = await this.projectService.update(
      projectId,
      updateProjectDto,
      file,
    );
    return { project };
  }

  @Delete('project/:id')
  async delete(
    @Param('id', ParseIntPipe) projectId: number,
  ): Promise<{ result: string }> {
    await this.projectService.delete(projectId);
    return { result: 'success' };
  }
}
