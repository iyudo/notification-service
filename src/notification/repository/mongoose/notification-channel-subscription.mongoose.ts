import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationChannelSubscription } from '../../models/notification-channel-subscription.models';
import { NotificationChannelSubscriptionRepository as NotificationChannelSubscriptionRepositoryInterface } from '../notification-channel-subscription.repository';
import { NotificationChannelSubscription as NotificationChannelSubscriptionMongoose } from '../../models/mongoose/notification-channel-subscription.mongoose';

@Injectable()
export class NotificationChannelSubscriptionRepository implements NotificationChannelSubscriptionRepositoryInterface {
  constructor(
    @InjectModel(NotificationChannelSubscriptionMongoose.name) private readonly notificationChannelSubscriptionModel: Model<NotificationChannelSubscription>,
  ) {}

  async findByEntityIDAndEntityType(id: string, type: string): Promise<string[]> {
    const result = await this.notificationChannelSubscriptionModel.findOne({ entityID: id, entityType: type }).exec();
    return result?.notificationChannel || [];
  }
}
