import { Controller, Get, UseGuards, Res, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { SystemResponse } from 'response-handler';

import { AuthUsersService } from './authUsers.service';

// @ApiTags('Users')
@Controller('users')
export class AuthUsersController {
  constructor(private readonly userService: AuthUsersService) {}
  /**
   * Method that provides path for google Auth
   */
  @ApiExcludeEndpoint()
  @Get()
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  /**
   * Callback URL that executes after google login
   */
  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    const dataFromGoogle: string = req.user;
    if (jwt) {
      const result = {
        statusCode: 200,
        success: true,
        message: 'Google Callback return result',
        data: {
          dataFromGoogle,
        },
      };

      res.json(result);
    } else {
      res.redirect('http://localhost:4200/login/failure');
    }
  }

  /**
   * Route to check for JWT
   * @returns string
   */
  @ApiExcludeEndpoint()
  @Get('auth/protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }

  @Get('list')
  async list(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.userService.find();
      logger.info({
        message: 'User details fetched successfully',
        data: [],
        option: [],
      });

      return res.send(
        SystemResponse.success('user details fetched successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }
}
