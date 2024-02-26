import { UserDto } from './user.dto';

export class CommentDto {
  content: string;
  date: Date;
  user: UserDto;
}
