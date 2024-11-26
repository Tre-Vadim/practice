import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from '@api/profile/profile.controller';
import { ProfileService } from '@api/profile/profile.service';
import { UserEntity } from '@api/user/user.entity';
import { FollowEntity } from '@api/profile/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
