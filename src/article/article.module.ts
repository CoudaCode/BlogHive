import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [
    // Import the article entity
    TypeOrmModule.forFeature([Article, User]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
