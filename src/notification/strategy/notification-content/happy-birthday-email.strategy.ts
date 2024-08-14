import { Injectable, Inject } from '@nestjs/common';
import { NotificationContentStrategy } from './notification-content.strategy';
import { UserRepository } from '../../../user/repository/user.repository';
import { Notification } from 'src/notification/models/notification.models';

@Injectable()
export class HappyBirthdayEmailStrategy implements NotificationContentStrategy {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async getContentObject(notification: Notification): Promise<Record<string, string>> {
        const userData = await this.userRepository.findByID(notification.userID);
        return {
            "firstName": userData.name,
            "companyName": userData.company.name
        };
    }
}