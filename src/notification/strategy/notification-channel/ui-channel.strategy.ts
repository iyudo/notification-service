import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from './notification-channel.strategy';

@Injectable()
export class UIChannelStrategy implements NotificationChannelStrategy {
  async execute() {
    console.log("notification being processed by ui channel");
  }
}