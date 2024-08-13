import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationChannel } from '../../models/notification-channel.models';
import { NotificationChannelRepository as NotificationChannelRepositoryInterface } from '../notification-channel.repository';
import { NotificationChannel as NotificationChannelMongoose } from '../../models/mongoose/notification-channel.mongoose';

@Injectable()
export class NotificationChannelRepository implements NotificationChannelRepositoryInterface {
  constructor(
    @InjectModel(NotificationChannelMongoose.name) private readonly notificationChannelModel: Model<NotificationChannel>,
  ) {}

  async findByNotificationType(type: string): Promise<string[]> {
    const result = await this.notificationChannelModel.findOne({ notificationType: type }).exec();
    return result?.notificationChannel || [];
  }
}
