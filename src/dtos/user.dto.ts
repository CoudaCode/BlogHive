import { profileDto } from './profile.dto';
import { ArticleDto } from './article.dto';
import { CommentDto } from './comment.dto';
export class UserDto {
  username: string;
  password: string;
  email: string;
  profile: profileDto;
  article: ArticleDto[];
  comment: CommentDto[];
}
