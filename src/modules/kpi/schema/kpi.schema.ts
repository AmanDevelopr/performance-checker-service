import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KpiDocument = Kpi & Document;

@Schema()
export class Kpi {
  @Prop()
  originalId: string;

  @Prop()
  name: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop()
  createdBy: string;

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

export const KpiSchema = SchemaFactory.createForClass(Kpi);
