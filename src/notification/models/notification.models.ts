export interface Notification {
    // id?: string; // Optional to handle auto-generated IDs
    notificationType: string;
    entityID: string;
    entityType: string;
    createdAt: Date;
}