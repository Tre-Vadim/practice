import { ArticleEntity } from '@api/article/article.entity';

export interface ArticleFindAllResponseInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}
