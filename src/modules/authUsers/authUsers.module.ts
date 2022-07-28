import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthUsersService } from './authUsers.service';
import { AuthUsersController } from './authUsers.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthUser, UserSchema } from './schemas/authUsers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthUser.name, schema: UserSchema }]),
  ],
  providers: [AuthUsersService, GoogleStrategy, JwtStrategy],
  controllers: [AuthUsersController],
  exports: [AuthUsersService],
})
export class AuthUsersModule {}
