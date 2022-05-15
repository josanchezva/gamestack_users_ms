import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  Email: string;

  @Prop({ required: true })
  Username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  Role: string;

  @Prop()
  GamePreferences: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
