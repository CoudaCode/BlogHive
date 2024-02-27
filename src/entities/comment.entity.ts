import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @OneToOne(() => User, (user) => user.comment)
  @JoinColumn()
  user: User;
}
