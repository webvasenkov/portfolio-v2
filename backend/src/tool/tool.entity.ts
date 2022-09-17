import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: 'tool'})
export class ToolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
