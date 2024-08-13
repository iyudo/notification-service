import { NotificationChannelSubscription } from '../models/notification-channel-subscription.models';

export interface NotificationChannelSubscriptionRepository {
  findByEntityIDAndEntityType(id: string, type: string): Promise<string[]>;
}