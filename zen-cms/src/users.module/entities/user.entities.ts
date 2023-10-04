import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entities';
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
  role: number;
  @Column({
    type: 'int',
    default: 0
  })
  expire: number;
}