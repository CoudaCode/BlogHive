import { Body, Injectable, Param, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'src/dtos/comment.dto';
import { Article } from 'src/entities/article.entity';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createComment(
    @Param('articleId') articleId: number,
    @Body() commentData: CommentDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const { content, date } = commentData;

      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        return res
          .status(404)
          .json({ status: false, message: 'Article not found' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'User not found' });
      }

      const newComment = await this.commentRepository.create({
        content,
        date,
        article: articleExist,
        user,
      });

      await this.commentRepository.save(newComment);
      return res.status(201).json({
        status: true,
        message: {
          ...newComment,
          user: undefined,
        },
      });
    } catch (e) {
      return res.status(500).json({ satut: false, message: e.message });
    }
  }

  async getComment(
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        return res
          .status(404)
          .json({ status: false, message: 'Article non trouvé' });
      }
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'Utilisateur non trouvé' });
      }
      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
        relations: ['user'],
      });

      if (!comment) {
        return res
          .status(404)
          .json({ status: false, message: 'Commentaire non trouvé' });
      }

      return res
        .status(200)
        .json({ status: true, message: { ...comment, user: undefined } });
    } catch (e) {
      return res.status(500).json({ status: false, message: e.message });
    }
  }

  async updateComment(
    @Body() commentData: CommentDto,
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const { content, date } = commentData;
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        return res
          .status(404)
          .json({ status: false, message: 'Article non trouvé' });
      }
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'Utilisateur non trouvé' });
      }
      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
        relations: ['user'],
      });

      if (!comment) {
        return res
          .status(404)
          .json({ status: false, message: 'Commentaire non trouvé' });
      }

      if (comment.user.id !== req.user.payload.id) {
        return res.status(403).json({
          status: false,
          message: 'Vous ne pouvez pas modifier ce commentaire',
        });
      }

      const updateComment = await this.commentRepository.update(
        { id: commentId },
        { content, date },
      );

      if (updateComment) {
        return res
          .status(200)
          .json({ status: true, message: 'Comment updated' });
      }

      return res
        .status(400)
        .json({ status: false, message: 'Comment not updated' });
    } catch (e) {
      return res.status(500).json({ satut: false, message: e.message });
    }
  }

  async deleteComment(
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        return res
          .status(404)
          .json({ status: false, message: 'Article not found' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'User not found' });
      }

      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
        relations: ['user'],
      });

      if (!comment) {
        return res
          .status(404)
          .json({ status: false, message: 'Comment not found' });
      }
      if (comment.user.id !== req.user.payload.id) {
        return res.status(403).json({
          status: false,
          message: 'You can not delete this comment',
        });
      }
      const deleteComment = await this.commentRepository.delete({
        id: commentId,
      });

      if (deleteComment) {
        return res
          .status(200)
          .json({ status: true, message: 'Comment deleted' });
      }

      res.status(400).json({ status: false, message: 'Comment not deleted' });
    } catch (e) {
      return res.status(500).json({ satut: false, message: e.message });
    }
  }

  async getCommentsByArticle(
    @Param('articleId') articleId: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'User not found' });
      }

      if (!articleExist) {
        return res
          .status(404)
          .json({ status: false, message: 'Article not found' });
      }

      const comments = await this.commentRepository.find({
        where: { article: articleExist },
        relations: ['user'],
      });

      if (!comments) {
        return res
          .status(404)
          .json({ status: false, message: 'Comments not found' });
      }

      return res.status(200).json({
        status: true,
        message: comments.map((comment) => ({
          ...comment,
          user: undefined,
        })),
      });
    } catch (e) {
      res.status(500).json({ satut: false, message: e.message });
    }
  }
}
