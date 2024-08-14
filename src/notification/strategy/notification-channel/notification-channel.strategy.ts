import { Notification } from '../../models/notification.models';

export interface NotificationChannelStrategy {
    // need to handle error
    processNotification(notification: Notification)
    sendNotification(userID: string, payload: any)
}