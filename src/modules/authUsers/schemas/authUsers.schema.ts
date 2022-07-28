import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type authUserDocument = AuthUser & Document;

@Schema()
export class AuthUser {
  @Prop()
  originalId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  token: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(AuthUser);
