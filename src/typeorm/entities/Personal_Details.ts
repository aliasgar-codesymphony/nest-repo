import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'personal_details' })
export class Personal_Details {
  @PrimaryGeneratedColumn()
  personalId: number;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId: User;
}
