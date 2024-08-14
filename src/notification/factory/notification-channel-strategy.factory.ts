import { Injectable, Inject } from '@nestjs/common';
import { NotificationChannelStrategy } from '../strategy/notification-channel/notification-channel.strategy';

@Injectable()
export class NotificationChannelStrategyFactory {
  constructor(
    @Inject('NotificationChannelStrategyProvider')
    private strategies: Map<string, NotificationChannelStrategy>
  ) {}

  getStrategy(strategyType: string): NotificationChannelStrategy {
    const strategy = this.strategies.get(strategyType);
    if (!strategy) {
      throw new Error(`Notification Strategy ${strategyType} not found`);
    }
    return strategy;
  }
}