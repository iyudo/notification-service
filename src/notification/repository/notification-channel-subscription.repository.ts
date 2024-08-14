export interface NotificationChannelSubscriptionRepository {
  findByEntityIDAndEntityType(id: string, type: string): Promise<string[]>;
}