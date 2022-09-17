import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ToolEntity } from '../tool/tool.entity';

@Entity({ name: 'project' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  link: string;

  @Column()
  desc: string;

  @ManyToMany(() => ToolEntity)
  @JoinTable()
  tools: string;
}
