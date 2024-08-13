import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationChannel as GeneralNotificationChannel, } from '../notification-channel.models';

@Schema()
export class NotificationChannel extends Document implements GeneralNotificationChannel {
  @Prop({ required: true })
  notificationType: string;

  @Prop({ required: true })
  notificationChannel: string[];
}

export const NotificationChannelSchema = SchemaFactory.createForClass(NotificationChannel);