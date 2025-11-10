import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'employment_details' })
export class Employment_Details {
  @PrimaryGeneratedColumn()
  employeeId: number;

  @Column()
  designation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column()
  joindate: string;

  @Column()
  department: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId: User;
}
