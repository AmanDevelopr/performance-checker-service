import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthUsersService } from '../../modules/authUsers/authUsers.service';
import { SystemResponse } from 'response-handler';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private readonly userService: AuthUsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let user;
      let token = req.header('Authorization');

      if (!token) {
        return res.send(
          SystemResponse.badRequestError('Unauthorized', 'Token not found'),
        );
      }

      if (token.startsWith('Bearer ')) {
        token = token.substring(7, token.length);
      }

      try {
        user = await jwt.verify(token, process.env.JWT_SECRET_KEY); // jwt.verify(token, secretOrPublicKey, [options, callback])
      } catch (err) {
        return res.send(
          SystemResponse.badRequestError(
            'Unauthorized, Invalid Token',
            err.message,
          ),
        );
      }

      const userData = await this.userService.findByEmail(
        user.userDetail.email,
      );

      res.locals.originalId = userData.originalId;

      if (!userData) {
        return res.send(
          SystemResponse.badRequestError('Unauthorized', 'User not found'),
        );
      }

      next();
    } catch (err) {
      return res.send(
        SystemResponse.badRequestError('Unauthorized', err.message),
      );
    }
  }
}
