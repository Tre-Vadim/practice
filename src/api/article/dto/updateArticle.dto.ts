import { IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly body: string;

  @IsOptional()
  readonly tagList: string[];
}
