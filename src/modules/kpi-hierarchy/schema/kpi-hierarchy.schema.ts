import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KpiHierarchyDocument = KpiHierarchy & Document;

@Schema()
export class KpiHierarchy {
  @Prop()
  originalId: string;

  @Prop()
  kpiId: string;

  @Prop({
    required: true,
    default: 'null',
  })
  parentKpiId: string;

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

export const KpiHierarchySchema = SchemaFactory.createForClass(KpiHierarchy);
