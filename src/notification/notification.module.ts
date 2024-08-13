import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification, NotificationSchema } from './models/mongoose/notification.mongoose';
import { NotificationChannel, NotificationChannelSchema } from './models/mongoose/notification-channel.mongoose';
import { NotificationChannelSubscription, NotificationChannelSubscriptionSchema } from './models/mongoose/notification-channel-subscription.mongoose';
import { NotificationRepository } from './repository/mongoose/notification.mongoose'
import { NotificationChannelRepository } from './repository/mongoose/notification-channel.mongoose'
import { NotificationChannelSubscriptionRepository } from './repository/mongoose/notification-channel-subscription.mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: NotificationChannel.name, schema: NotificationChannelSchema }]),
    MongooseModule.forFeature([{ name: NotificationChannelSubscription.name, schema: NotificationChannelSubscriptionSchema }])
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepository
    },
    {
      provide: 'NotificationChannelRepository',
      useClass: NotificationChannelRepository
    },
    {
      provide: 'NotificationChannelSubscriptionRepository',
      useClass: NotificationChannelSubscriptionRepository
    },
  ]
})
export class NotificationModule {}
