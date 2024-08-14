import { Injectable, Inject } from '@nestjs/common';
import { NotificationContentStrategy } from '../strategy/notification-content/notification-content.strategy';

@Injectable()
export class NotificationContentStrategyFactory {
  constructor(
    @Inject('NotificationContentStrategyProvider')
    private strategies: Map<string, Map<string, NotificationContentStrategy>>
  ) {
    // console.log("NotificationContentStrategyFactory instantiated:", strategies);
  }

  getStrategy(notificationType: string, notificationChannel: string): NotificationContentStrategy {
    const strategy = this.strategies.get(notificationChannel)?.get(notificationType);
    if (!strategy) {
      throw new Error(`Notification Content Strategy ${notificationType}, ${notificationChannel} not found`);
    }
    return strategy;
  }
}