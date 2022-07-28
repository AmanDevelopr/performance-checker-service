import { Module } from '@nestjs/common';
import { authMiddleware } from './authMiddleware.service';
import { AuthUsersModule } from '../../modules/authUsers/authUsers.module';

@Module({
  imports: [AuthUsersModule],
  controllers: [],
  providers: [authMiddleware],
})
export class AuthMiddlewareModule {}
