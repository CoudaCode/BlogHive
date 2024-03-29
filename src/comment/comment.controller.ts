import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentDto } from 'src/dtos/comment.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('article/:articleId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createComment(
    @Param('articleId') articleId: number,
    @Body() commentData: CommentDto,
    @Req() req,
    @Res() res,
  ) {
    return await this.commentService.createComment(
      articleId,
      commentData,
      req,
      res,
    );
  }
  @UseGuards(AuthGuard)
  @Get(':commentId')
  async getComment(
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    return await this.commentService.getComment(articleId, commentId, req, res);
  }

  @UseGuards(AuthGuard)
  @Put(':commentId')
  async updateComment(
    @Body() commentData: CommentDto,
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    return await this.commentService.updateComment(
      commentData,
      articleId,
      commentId,
      req,
      res,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':commentId')
  async deleteComment(
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Req() req,
    @Res() res,
  ) {
    return await this.commentService.deleteComment(
      articleId,
      commentId,
      req,
      res,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getComments(
    @Param('articleId') articleId: number,
    @Req() req,
    @Res() res,
  ) {
    return await this.commentService.getCommentsByArticle(articleId, req, res);
  }
}
