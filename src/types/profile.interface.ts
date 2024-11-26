import { UserType } from './user.interface';

export type ProfileType = UserType & { following: boolean };

export interface ProfileResponseInterface {
  profile: ProfileType;
}
