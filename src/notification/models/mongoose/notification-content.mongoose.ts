import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationContent as GeneralNotificationContent, } from '../notification-content.models';

@Schema()
export class NotificationContent extends Document implements GeneralNotificationContent {
  @Prop({ required: true })
  notificationChannel: string;

  @Prop({ required: true })
  notificationContent: string;
}

export const NotificationContentSchema = SchemaFactory.createForClass(NotificationContent);