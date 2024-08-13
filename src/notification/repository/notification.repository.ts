import { Notification } from '../models/notification.models';

export interface NotificationRepository {
  create(notification: Partial<Notification>): Promise<Notification>;
  findByEntityIDAndEntityType(id: string, type: string): Promise<Notification[]>;
}