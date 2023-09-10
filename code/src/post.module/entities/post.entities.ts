import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @Column('simple-array')
  pic: string[];
  @CreateDateColumn()
  time: string;
  @UpdateDateColumn()
  timeUpdate: string;
  @Column({
    type: 'int',
    default: 0
  })
  views: number;
  @Column({
    type: 'int2',
    default: 0
  })
  del: number;
}