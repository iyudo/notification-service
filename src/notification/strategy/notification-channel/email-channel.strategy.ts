import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from './notification-channel.strategy';
import { Notification } from 'src/notification/models/notification.models';

@Injectable()
export class EmailChannelStrategy implements NotificationChannelStrategy {
  processNotification(notification: Notification) {
  }
  sendNotification(userID: string, payload: any) {
    console.log("sending email to:", userID);
    console.log("email content:", payload);
  }
}