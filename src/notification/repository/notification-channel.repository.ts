import { NotificationChannel } from '../models/notification-channel.models';

export interface NotificationChannelRepository {
  findByNotificationType(type: string): Promise<string[]>;
}