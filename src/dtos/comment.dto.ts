import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';
import { UserDto } from './user.dto';
export class CommentDto {
  @ApiProperty({
    example: 'This is a comment',
    required: true,
  })
  content: string;

  @ApiProperty({
    example: '2021-09-20T00:00:00.000Z',
    required: true,
  })
  date: Date;
  article: ArticleDto;
  user: UserDto;
}
