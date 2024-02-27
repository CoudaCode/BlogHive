import { CommentDto } from './comment.dto';
import { UserDto } from './user.dto';
export class ArticleDto {
  title: string;
  content: string;
  comments: CommentDto[];
  user: UserDto;
}

/*
[



{
  "title":"Demon Slayer",
  "content":"Demon Slayer is a Japanese manga series written and illustrated by Koyoharu Gotouge. It follows Tanjiro Kamado, a young
}

{
  "title":"Naruto Shippuden",
  "content":"Naruto Shippuden is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja
}

{
  "title":"One Piece",
  "content":"One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. It follows the adventures of Monkey"
}

{
  "title":"Black Clover",
  "content":"Black Clover is a Japanese manga series written and illustrated by Yūki Tabata. It follows"
}

{
  "title":"Attack on Titan",
  "content":"Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity"
}

{
  "title":"My Hero Academia",
  "content":"My Hero Academia is a Japanese manga series written and illustrated by Kōhei Horikoshi. It follows the story of Izuku Midoriya, a"
}

{
  "title":"Bleach",
  "content":"Bleach is a Japanese manga series written and illustrated by Tite Kubo. It follows the story of Ichigo Kurosaki, a teenager with the ability to see"
}

{
  "title":"Dragon Ball Z",
  "content":"Dragon Ball Z is a Japanese anime television series produced by Toei Animation. It is the sequel to the Dragon Ball anime and adapts the latter 325 chapters of the original 519-chapter Dragon Ball manga series created by Akira Toriyama."
}

{
  "title":"One Punch",
  "content":"One puch man blablabla"
}

]
*/
