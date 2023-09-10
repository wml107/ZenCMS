import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ReqLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
  @Column()
  method: string;

  @Column('simple-json')
  query: {};
  @Column('simple-json')
  body: {};
  @Column('simple-array')
  header: string[];
  @Column('simple-json')
  user: {};
  @Column({
    default: ""
  })
  ip: string;

  @Column('simple-json')
  res: {};

  @Column({
    type: 'boolean',
    default: false
  })
  error: boolean;

  @CreateDateColumn()
  time: string;

  @Column({
    type: 'int2',
    default: 0
  })
  del: number;
}