import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';
import { CommentDto } from './comment.dto';
import { profileDto } from './profile.dto';
export class UserDto {
  @ApiProperty({
    example: 'JohnDoe',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  email: string;

  profile: profileDto;
  article: ArticleDto[];
  comment: CommentDto[];
}
