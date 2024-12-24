import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import slugify from 'slugify';

import { UserEntity } from '@api/user/user.entity';
import { CreateArticleDto } from '@api/article/dto/createArticle.dto';
import { ArticleEntity } from '@api/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleResponseInterface } from '../../types/articleResponse.interface';
import { UpdateArticleDto } from '@api/article/dto/updateArticle.dto';
import {
  QueryArticleDto,
  QueryFeedArticleDto,
} from '@api/article/dto/queryArticle.dto';
import { ArticleFindAllResponseInterface } from '../../types/articleFindAllResponse.interface';
import { FollowEntity } from '@api/profile/follow.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async findAll(
    userId: number | null,
    {
      limit: take = '20',
      offset: skip = '0',
      author,
      tag,
      favorited,
    }: QueryArticleDto,
  ): Promise<ArticleFindAllResponseInterface> {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author')
      .orderBy('articles.createdAt', 'DESC');

    if (author) {
      const user = await this.userRepository.findOne({
        where: { username: author },
      });
      queryBuilder.andWhere('articles.authorId = :id', {
        id: user?.id || null,
      });
    }

    if (favorited) {
      const user = await this.userRepository.findOne({
        where: { username: favorited },
        relations: ['favorites'],
      });
      const articleIds = user.favorites.map((article) => article.id);
      if (articleIds.length > 0) {
        queryBuilder.andWhere('articles.id IN (:...ids)', {
          ids: articleIds,
        });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }

    if (tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', { tag: `%${tag}%` });
    }

    if (take) {
      queryBuilder.take(+take);
    }

    if (skip) {
      queryBuilder.skip(+skip);
    }

    let favoriteIds: number[] = [];

    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favorites'],
      });
      favoriteIds = user.favorites.map((favorite) => favorite.id);
    }

    const [articles, articlesCount] = await queryBuilder.getManyAndCount();
    const articlesWithFavorites = articles.map((article) => ({
      ...article,
      favorited: favoriteIds.includes(article.id),
    }));

    return { articles: articlesWithFavorites, articlesCount };
  }

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity(createArticleDto);

    if (!newArticle.tagList) {
      newArticle.tagList = [];
    }

    newArticle.author = currentUser;
    newArticle.slug = this.getSlug(createArticleDto.title);

    return await this.articleRepository.save(newArticle);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({
      where: { slug },
    });
  }

  async deleteArticle(userId: number, slug: string): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new NotFoundException('Article does not exist');
    }

    if (article.author.id !== userId) {
      throw new ForbiddenException('You are not author for this article');
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    userId: number,
    slug: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new NotFoundException('Article does not exist');
    }

    if (article.author.id !== userId) {
      throw new ForbiddenException('You are not author for this article');
    }

    if (updateArticleDto.title) {
      article.slug = this.getSlug(updateArticleDto.title);
    }

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  async addArticleToFavorites(
    userId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    const isAlreadyLikedArticle = user.favorites.some(
      ({ slug: x }) => x === slug,
    );

    if (!isAlreadyLikedArticle) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async deleteArticleFromFavorites(
    userId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const isAlreadyLikedArticle = user.favorites.some(
      ({ slug: x }) => x === slug,
    );

    if (isAlreadyLikedArticle) {
      user.favorites = user.favorites.filter(({ slug: x }) => x !== slug);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async getFeed(
    userId: number,
    { limit: take = '20', offset: skip = '0' }: QueryFeedArticleDto,
  ): Promise<ArticleFindAllResponseInterface> {
    const follows = await this.followRepository.find({
      where: { followerId: userId },
    });

    console.log('follows', follows);

    if (follows.length === 0) {
      return { articles: [], articlesCount: 0 };
    }

    const followingUserIds = follows.map(({ followingId }) => followingId);

    const queryBuilder = this.articleRepository
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author')
      .where('articles.authorId IN (:...ids)', { ids: followingUserIds })
      .orderBy('articles.createdAt', 'DESC');

    if (take) {
      queryBuilder.take(+take);
    }

    if (skip) {
      queryBuilder.skip(+skip);
    }

    const [articles, articlesCount] = await queryBuilder.getManyAndCount();

    return { articles, articlesCount };
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return {
      article,
    };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
