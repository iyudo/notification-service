import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../models/notification.models';
import { NotificationRepository as NotificationRepositoryInterface } from '../notification.repository';
import { Notification as NotificationMongoose } from '../../models/mongoose/notification.mongoose';

@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectModel(NotificationMongoose.name) private readonly notificationModel: Model<Notification>,
  ) {}

  async findByEntityIDAndEntityType(id: string, type: string): Promise<Notification[]> {
    return this.notificationModel.find({ entityID: id, entityType: type }).exec();
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    const newNotification = new this.notificationModel(notification);
    return newNotification.save();
  }
}
