import { Body, Injectable, Param, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDto } from '../dtos/article.dto';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
@Injectable()
export class ArticleService {
  constructor(
    // Inject the article repository
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createArticle(@Body() articleData: ArticleDto, @Req() req, @Res() res) {
    try {
      const { title, content } = articleData;
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }
      const articleExist = await this.articleRepository.findOne({
        where: { title: articleData.title },
      });
      if (articleExist) {
        return res
          .status(400)
          .json({ statut: true, message: 'Article already exist' });
      }

      const newArticle = this.articleRepository.create({
        title,
        content,
        user,
      });

      const article = await this.articleRepository.save(newArticle);

      if (article) {
        return res
          .status(201)
          .json({ statut: true, message: { ...article, user: undefined } });
      }

      return res
        .status(400)
        .json({ statut: true, message: 'Article not created' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async getAllArticlesByUser(@Req() req, @Res() res) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }
      const articles = await this.articleRepository.find({
        where: { user },
      });
      if (!articles) {
        return res
          .status(404)
          .json({ statut: false, message: 'No article found' });
      }
      return res.status(200).json({ statut: true, message: articles });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async getArticle(@Param('id') id: number, @Req() req, @Res() res) {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: id },
      });
      if (!article) {
        return res
          .status(404)
          .json({ statut: false, message: 'Article not found' });
      }
      return res.status(200).json({ statut: true, message: article });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async updateArticle(
    @Param('id') id: number,
    @Body() articleData: ArticleDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const { title, content } = articleData;
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }
      const article = await this.articleRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!article) {
        return res
          .status(404)
          .json({ statut: false, message: 'Article not found' });
      }
      console.log(article.user.id);
      if (article.user.id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }
      article.title = title;
      article.content = content;

      const updatedArticle = await this.articleRepository.save(article);
      if (updatedArticle) {
        return res.status(200).json({
          statut: true,
          message: { ...updatedArticle, user: undefined },
        });
      }
      return res
        .status(400)
        .json({ statut: false, message: 'Article not updated' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async deleteArticle(@Param('id') id: number, @Req() req, @Res() res) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }
      const article = await this.articleRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!article) {
        return res
          .status(404)
          .json({ statut: false, message: 'Article not found' });
      }
      if (article.user.id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }
      const deletedArticle = await this.articleRepository.remove(article);
      if (deletedArticle) {
        return res
          .status(200)
          .json({ statut: true, message: 'Article deleted' });
      }
      return res
        .status(400)
        .json({ statut: false, message: 'Article not deleted' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}
