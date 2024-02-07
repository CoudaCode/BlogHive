import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    CommentModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
