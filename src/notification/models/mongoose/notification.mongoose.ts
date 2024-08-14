import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Notification as GeneralNotification } from '../notification.models';

@Schema()
export class Notification extends Document implements GeneralNotification {
  @Prop({ required: true })
  notificationType: string;

  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  companyID: string;

  @Prop()
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

