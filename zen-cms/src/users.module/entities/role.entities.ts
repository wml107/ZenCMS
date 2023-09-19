import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true
  })
  rolename: string;
  @Column('simple-array')
  claims: string[];
}