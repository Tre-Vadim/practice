import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@api/user/user.entity';
import {
  ProfileResponseInterface,
  ProfileType,
} from '../../types/profile.interface';
import { FollowEntity } from '@api/profile/follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private followEntityRepository: Repository<FollowEntity>,
  ) {}

  async getProfile(userId: number, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    const follow = await this.followEntityRepository.findOne({
      where: {
        followerId: userId,
        followingId: user.id,
      },
    });

    return {
      ...user,
      following: Boolean(follow),
    };
  }

  async followProfile(userId: number, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    if (userId === user.id) {
      throw new BadRequestException("Follower and following can't be equal");
    }

    const follow = await this.followEntityRepository.findOne({
      where: {
        followerId: userId,
        followingId: user.id,
      },
    });

    if (!follow) {
      const followToCreate = new FollowEntity({
        followerId: userId,
        followingId: user.id,
      });

      await this.followEntityRepository.save(followToCreate);
    }

    return {
      ...user,
      following: true,
    };
  }

  async unfollowProfile(
    userId: number,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    if (userId === user.id) {
      throw new BadRequestException("Follower and following can't be equal");
    }

    const follow = await this.followEntityRepository.findOne({
      where: {
        followerId: userId,
        followingId: user.id,
      },
    });

    if (!follow) {
      throw new NotFoundException("The user doesn't follow the following");
    }

    await this.followEntityRepository.delete({
      followerId: userId,
      followingId: user.id,
    });

    return {
      ...user,
      following: false,
    };
  }

  buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
    delete profile.email;
    return { profile };
  }
}
