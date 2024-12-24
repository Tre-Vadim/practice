import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { UserService } from '@api/user/user.service';
import { JWT_SECRET } from '../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode: any = verify(token, JWT_SECRET);
      req.user = await this.userService.findById(decode.id);
      next();
    } catch (error) {
      console.log('error', error);
      req.user = null;
      next();
    }
  }
}
