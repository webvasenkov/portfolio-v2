import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  getProjects(): { data: 'projects' } {
    return { data: 'projects' };
  }
}
