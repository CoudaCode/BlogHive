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

      console.log(content, date);
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        res.status(404).json({ status: false, message: 'Article not found' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
      }

      const newComment = await this.commentRepository.create({
        content,
        date,
        article: articleExist,
        user,
      });

      await this.commentRepository.save(newComment);
      res.status(201).json({
        status: true,
        message: {
          ...newComment,
          user: undefined,
        },
      });
    } catch (e) {
      res.status(500).json({ satut: false, message: e.message });
    }
  }

  // async getComments(@Res() res) {
  //   try {
  //   } catch (e) {
  //     res.status(500).json({ satut: false, message: e.message });
  //   }
  // }

  async getComment(
    @Param('articleId') articleId: number,
    @Param('commentID') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        res.status(404).json({ status: false, message: 'Article not found' });
      }
      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
      }
      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
        relations: ['user'], // Inclure les détails de l'utilisateur associé au commentaire
      });

      if (!comment) {
        res.status(404).json({ status: false, message: 'Comment not found' });
      }

      res
        .status(200)
        .json({ status: true, message: { ...comment, user: undefined } });
    } catch (e) {
      res.status(500).json({ satut: false, message: e.message });
    }
  }

  async updateComment(
    @Param('commentId') commentId: number,
    @Param('articleId') articleId: number,
    @Body()
    commentData: CommentDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const { content, date } = commentData;

      const articleExist = await this.articleRepository.findOne({
        where: { id: articleId },
      });

      if (!articleExist) {
        res.status(404).json({ status: false, message: 'Article not found' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
      }

      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
      });

      if (!comment) {
        res.status(404).json({ status: false, message: 'Comment not found' });
      }

      const updateComment = await this.commentRepository.update(
        { id: commentId },
        { content, date },
      );

      if (updateComment) {
        res.status(200).json({ status: true, message: 'Comment updated' });
      }

      res.status(400).json({ status: false, message: 'Comment not updated' });
    } catch (e) {
      res.status(500).json({ satut: false, message: e.message });
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
        res.status(404).json({ status: false, message: 'Article not found' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user.payload.id },
      });

      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
      }

      const comment = await this.commentRepository.findOne({
        where: { id: commentId, article: articleExist },
      });

      if (!comment) {
        res.status(404).json({ status: false, message: 'Comment not found' });
      }

      const deleteComment = await this.commentRepository.delete({
        id: commentId,
      });

      if (deleteComment) {
        res.status(200).json({ status: true, message: 'Comment deleted' });
      }

      res.status(400).json({ status: false, message: 'Comment not deleted' });
    } catch (e) {
      res.status(500).json({ satut: false, message: e.message });
    }
  }

  // async getCommentsByArticle(
  //   @Param('commentId') commentId: number,
  //   @Req() req,
  //   @Res() res,
  // ) {
  //   try {
  //   } catch (e) {
  //     res.status(500).json({ satut: false, message: e.message });
  //   }
  // }
}
