import { UserEntity } from '@api/user/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword' | 'password'>;

export interface UserResponseInterface {
  user: UserType & { token: string };
}
