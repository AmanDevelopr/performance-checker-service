import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as JWT from 'jsonwebtoken';

import { AuthUser } from './schemas/authUsers.schema';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthUsersService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  constructor(@InjectModel(AuthUser.name) private userModel: Model<AuthUser>) {}

  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }
  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
    userDetail: any,
  ): Promise<string> {
    try {
      const payload = {
        userDetail,
        thirdPartyId,
        provider,
      };
      const jwt: string = await JWT.sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });

      const userDataGoogle = {
        name: userDetail.firstName + ' ' + userDetail.lastName,
        email: userDetail.email,
        token: jwt,
      };

      this.createGoogleUser(userDataGoogle);

      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async createGoogleUser(Payload: any): Promise<AuthUser> {
    const payloadObject = Payload;
    // Check if exist then update else insert
    const checkUser = await this.userModel
      .findOne({ email: payloadObject.email })
      .exec();
    if (checkUser) {
      // Update token
      const filter = { email: payloadObject.email };
      const update = { token: payloadObject.token };
      return await this.userModel.findOneAndUpdate(filter, update, {
        new: true,
      });
    } else {
      // Insert //
      const id = AuthUsersService.createObjectId();
      const createdGoogleUser = new this.userModel({
        originalId: id,
        ...payloadObject,
      });
      return await createdGoogleUser.save();
    }
  }

  async findOne(id: string): Promise<AuthUser> {
    const single = await this.userModel.findOne({
      originalId: id,
      updatedAt: undefined,
      deletedAt: undefined,
    });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async findByEmail(email: string): Promise<AuthUser> {
    const single = await this.userModel.findOne({
      email: email,
      updatedAt: undefined,
      deletedAt: undefined,
    });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async find(): Promise<AuthUser[]> {
    const data = await this.userModel.find();
    if (!data) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return data;
  }
}
