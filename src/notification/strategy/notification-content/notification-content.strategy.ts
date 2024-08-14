import { Notification } from '../../models/notification.models';

export interface NotificationContentStrategy {
    // need to handle error
    getContentObject(noitifcation: Notification): Promise<Record<string, string>>;
}