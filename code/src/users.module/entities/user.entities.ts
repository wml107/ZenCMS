import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true
  })
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column({
    type: 'int',
    default: 0
  })
  expire: number;
  @Column({
    type: 'int2',
    default: 0
  })
  del: number;
}