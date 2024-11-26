import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follows')
export class FollowEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;

  constructor(partial: Partial<FollowEntity>) {
    Object.assign(this, partial);
  }
}
