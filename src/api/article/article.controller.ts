import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { AuthGuard } from '@guards/auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { GetUser } from '@decorators/user.decorator';
import { UserEntity } from '@api/user/user.entity';
import { UpdateArticleDto } from '@api/article/dto/updateArticle.dto';
import { ArticleResponseInterface } from '../../types/articleResponse.interface';
import { ArticleFindAllResponseInterface } from '../../types/articleFindAllResponse.interface';
import {
  QueryArticleDto,
  QueryFeedArticleDto,
} from '@api/article/dto/queryArticle.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @GetUser('id') userId: number,
    @Query() query: QueryArticleDto,
  ): Promise<ArticleFindAllResponseInterface> {
    return await this.articleService.findAll(userId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @GetUser('id') userId: number,
    @Query() query: QueryFeedArticleDto,
  ) {
    return this.articleService.getFeed(userId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body('article') createArticleDto: CreateArticleDto,
    @GetUser() user: UserEntity,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      user,
      createArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @GetUser('id') userId: number,
  ): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(userId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Param('slug') slug: string,
    @GetUser('id') userId: number,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      userId,
      slug,
      updateArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @GetUser('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @GetUser('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
