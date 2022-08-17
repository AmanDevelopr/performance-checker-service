import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  originalId: string;

  @Prop()
  categoryName: string;

  @Prop()
  parentId: number;

  @Prop({
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    required: false,
    default: undefined,
  })
  updatedAt: Date;

  @Prop({
    required: false,
    default: undefined,
  })
  deletedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
