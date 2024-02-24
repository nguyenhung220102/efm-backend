import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.model';
export type SampleDocument = Sample & Document;
@Schema()
export class Sample {
  @Prop({ required: true })
  content: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}
export const SampleSchema = SchemaFactory.createForClass(Sample);
