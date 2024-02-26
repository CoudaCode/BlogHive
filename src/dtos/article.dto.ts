import { UserDto } from './user.dto';
export class ArticleDto {
  title: string;
  content: string;
  user: UserDto;
}
