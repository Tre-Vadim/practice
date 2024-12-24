import { IsOptional, IsString } from 'class-validator';

export class QueryArticleDto {
  @IsOptional()
  @IsString()
  readonly tag: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly favorited: string;

  @IsOptional()
  @IsString()
  readonly limit: string;

  @IsOptional()
  @IsString()
  readonly offset: string;
}

export class QueryFeedArticleDto {
  @IsOptional()
  @IsString()
  readonly limit: string;

  @IsOptional()
  @IsString()
  readonly offset: string;
}
