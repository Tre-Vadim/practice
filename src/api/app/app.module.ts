import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from '@middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { ProfileModule } from '../profile/profile.module';
import ormConfig from '../../db/ormconfig';

@Module({
  imports: [ormConfig, TagModule, UserModule, ArticleModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
