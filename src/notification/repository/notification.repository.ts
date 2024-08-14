import { Notification } from '../models/notification.models';

export interface NotificationRepository {
  create(notification: Partial<Notification>): Promise<Notification>;
  findByUserID(id: string): Promise<Notification[]>;
}