import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NotificationContent as GeneralNotificationContent, } from '../notification-content.models';

@Schema()
export class NotificationContent extends Document implements GeneralNotificationContent {
  @Prop({ required: true })
  notificationType: string;

  @Prop({ required: true })
  notificationChannel: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  notificationContent: Record<string, string>;
}

export const NotificationContentSchema = SchemaFactory.createForClass(NotificationContent);