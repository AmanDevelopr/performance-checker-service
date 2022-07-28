import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectsDocument = Projects & Document;

@Schema()
export class Projects {
    @Prop()
    originalId: string;

    @Prop()
    userId: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    techStack: string;

    @Prop({
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        required: false,
        default: 1,
    })
    version: number;

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

export const ProjectsSchema = SchemaFactory.createForClass(Projects);
