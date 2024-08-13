import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationChannelSubscription as GeneralNotificationChannelSubscription, } from '../notification-channel-subscription.models';

@Schema()
export class NotificationChannelSubscription extends Document implements GeneralNotificationChannelSubscription {
  @Prop({ required: true })
  entityID: string;

  @Prop({ required: true })
  entityType: string;

  @Prop({ required: true })
  notificationChannel: string[];
}

export const NotificationChannelSubscriptionSchema = SchemaFactory.createForClass(NotificationChannelSubscription);