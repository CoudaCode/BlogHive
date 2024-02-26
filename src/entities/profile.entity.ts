import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  sex: string;
  @Column()
  birthDate: Date;
  @Column()
  bio: string;
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
