import { NotificationContent } from '../models/notification-content.models';

export interface NotificationContentRepository {
  findByNotificationTypeAndChannel(type: string, channel: string): Promise<NotificationContent>;
}