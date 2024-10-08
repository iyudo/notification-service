import { Injectable, Inject } from '@nestjs/common';
import { NotificationRepository } from './repository/notification.repository';
import { NotificationChannelRepository } from './repository/notification-channel.repository';
import { NotificationChannelSubscriptionRepository } from './repository/notification-channel-subscription.repository';
import { NotificationContentRepository } from './repository/notification-content.repository';
import { Notification } from './models/notification.models';
import { NotificationContent } from './models/notification-content.models';
import { NotificationChannelStrategyFactory } from './factory/notification-channel-strategy.factory';
import { NotificationContentStrategyFactory } from './factory/notification-content-strategy.factory';
import * as Mustache from 'mustache';

@Injectable()
export class NotificationService {
    constructor(
        @Inject('NotificationRepository') private readonly notificationRepository: NotificationRepository,
        @Inject('NotificationChannelRepository') private readonly notificationChannelRepository: NotificationChannelRepository,
        @Inject('NotificationChannelSubscriptionRepository') private readonly notificationChannelSubscriptionRepository: NotificationChannelSubscriptionRepository,
        @Inject('NotificationContentRepository') private readonly notificationContentRepository: NotificationContentRepository,
        private readonly notificationChannelStrategy: NotificationChannelStrategyFactory,
        private readonly notificationContentStrategy: NotificationContentStrategyFactory
    ) { }

    async getNotification(userID: string): Promise<Notification[]> {
        return this.notificationRepository.findByUserID(userID);
    }

    async process(notification: Notification) {
        const channelSet = new Set<string>();
        const configurationNotificationChannels = await this.notificationChannelRepository.findByNotificationType(notification.notificationType);
        const userNotificationChannels = await this.notificationChannelSubscriptionRepository.findByEntityIDAndEntityType(notification.userID, "user")
        const companyNotificationChannels = await this.notificationChannelSubscriptionRepository.findByEntityIDAndEntityType(notification.companyID, "company")
        // console.log("configurationNotificationChannels:", configurationNotificationChannels);
        // console.log("userNotificationChannels:", userNotificationChannels);
        // console.log("companyNotificationChannels:", companyNotificationChannels);
        userNotificationChannels.forEach(element => channelSet.add(element));
        companyNotificationChannels.forEach(element => channelSet.add(element));
        // console.log("channelSet:", channelSet);

        for (const element of configurationNotificationChannels) {
            if (channelSet.has(element)) {
                const channelStrategy = this.notificationChannelStrategy.getStrategy(element);
                const contentStrategy = this.notificationContentStrategy.getStrategy(notification.notificationType, element);
                channelStrategy.processNotification(notification);
                const content = await this.notificationContentRepository.findByNotificationTypeAndChannel(notification.notificationType, element)
                const contentValue = await contentStrategy.getContentObject(notification);
                for (const key of Object.keys(content.notificationContent)) {
                    content.notificationContent[key] = Mustache.render(content.notificationContent[key], contentValue);
                }
                channelStrategy.sendNotification(notification.userID, content.notificationContent);
            }
        }
    }
}
