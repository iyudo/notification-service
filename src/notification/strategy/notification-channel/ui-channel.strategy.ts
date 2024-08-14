import { Injectable, Inject } from '@nestjs/common';
import { NotificationChannelStrategy } from './notification-channel.strategy';
import { Notification } from 'src/notification/models/notification.models';
import { NotificationRepository } from '../../repository/notification.repository'

@Injectable()
export class UIChannelStrategy implements NotificationChannelStrategy {
  constructor(
    @Inject('NotificationRepository') private readonly notificationRepository: NotificationRepository
  ) {}

  processNotification(notification: Notification) {
    notification.createdAt = new Date();
    this.notificationRepository.create(notification);
  }

  sendNotification(userID: string, payload: any) {
    console.log("sending ui to:", userID);
    console.log("ui content:", payload);
  }
}