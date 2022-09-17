import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'social' })
export class SocialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;
}
