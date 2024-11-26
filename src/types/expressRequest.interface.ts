import { Request } from 'express';

import { UserEntity } from '@api/user/user.entity';

export interface ExpressRequestInterface extends Request {
  user?: UserEntity;
}
