import { UserDto } from './user.dto';
import { ArticleDto } from './article.dto';
export class CommentDto {
  content: string;
  date: Date;
  article: ArticleDto;
  user: UserDto;
}
