export interface NotificationContent {
    notificationType: string;
    notificationChannel: string;
    notificationContent: Record<string, string>;
}