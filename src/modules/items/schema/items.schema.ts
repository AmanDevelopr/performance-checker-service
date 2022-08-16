import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemsDocument = Items & Document;

@Schema()
export class Items {
    @Prop()
    originalId: string;
    
    @Prop()
    item: string;

    @Prop()
    subCategory: string;

    @Prop()
    category: string;

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

export const ItemsSchema = SchemaFactory.createForClass(Items);
