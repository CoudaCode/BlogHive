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
import { ArticleDto } from 'src/dtos/article.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ArticleService } from './article.service';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() articleData: ArticleDto, @Req() req, @Res() res) {
    // return await this.articleService.createArticle(articleData, req, res);
    return await this.articleService.createArticle(articleData, req, res);
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllArticles(@Req() req, @Res() res) {
    // return await this.articleService.getAllArticles(req, res);
    return await this.articleService.getAllArticlesByUser(req, res);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getArticle(@Param('id') id: number, @Req() req, @Res() res) {
    // return await this.articleService.getArticle(id, req, res);
    return await this.articleService.getArticle(id, req, res);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() articleData: ArticleDto,
    @Req() req,
    @Res() res,
  ) {
    // return await this.articleService.updateArticle(id, articleData, req, res);
    return await this.articleService.updateArticle(id, articleData, req, res);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') id: number, @Req() req, @Res() res) {
    // return await this.articleService.deleteArticle(id, req, res);
    return await this.articleService.deleteArticle(id, req, res);
  }
}
