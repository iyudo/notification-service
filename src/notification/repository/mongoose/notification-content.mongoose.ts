import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationContent } from '../../models/notification-content.models';
import { NotificationContentRepository as NotificationContentRepositoryInterface } from '../notification-content.repository';
import { NotificationContent as NotificationContentMongoose } from '../../models/mongoose/notification-content.mongoose';

@Injectable()
export class NotificationContentRepository implements NotificationContentRepositoryInterface {
  constructor(
    @InjectModel(NotificationContentMongoose.name) private readonly notificationContentModel: Model<NotificationContent>,
  ) {}

  async findByNotificationTypeAndChannel(type: string, channel: string): Promise<NotificationContent> {
    return this.notificationContentModel.findOne({ notificationType: type, notificationChannel: channel }).exec();
  }
}
