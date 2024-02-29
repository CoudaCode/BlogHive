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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from 'src/dtos/article.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ArticleService } from './article.service';
@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'Artcile already exist' })
  @ApiResponse({ status: 400, description: 'Article not created' })
  @ApiResponse({ status: 401, description: 'Token is expired' })
  @ApiBody({
    type: ArticleDto,
    description: 'Json structure  for article object',
  })
  async createArticle(@Body() articleData: ArticleDto, @Req() req, @Res() res) {
    // return await this.articleService.createArticle(articleData, req, res);
    return await this.articleService.createArticle(articleData, req, res);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'Artcile already exist' })
  @ApiResponse({ status: 401, description: 'Token is expired' })
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
