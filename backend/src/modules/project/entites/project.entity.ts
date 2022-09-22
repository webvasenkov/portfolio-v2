import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ToolEntity } from '../../tool/entities/tool.entity';

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

  @Column({default: ''})
  img: string;

  @ManyToMany(() => ToolEntity)
  @JoinTable()
  tools: string;
}
