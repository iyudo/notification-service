export interface Notification {
    // id?: string; // Optional to handle auto-generated IDs
    notificationType: string;
    userID: string;
    companyID: string;
    createdAt: Date;
}