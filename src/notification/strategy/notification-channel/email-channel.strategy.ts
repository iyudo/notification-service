import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from './notification-channel.strategy';

@Injectable()
export class EmailChannelStrategy implements NotificationChannelStrategy {
  async execute() {
    console.log("notification being processed by email channel");
  }
}