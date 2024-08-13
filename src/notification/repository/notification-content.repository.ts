import { NotificationContent } from '../models/notification-content.models';

export interface NotificationContentRepository {
  findByNotificationChannel(channel: string): Promise<NotificationContent>;
}