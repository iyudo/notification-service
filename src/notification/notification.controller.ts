import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './models/notification.models';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    // TODO: error handler e.g. notification type does not exist
    @Post()
    async process(@Body() notification: Notification) {
        return this.notificationService.process(notification);
    }

    // TODO: should add pagination
    @Get()
    async getNotifications(
        @Query('userID') userID: string
    ) {
        return this.notificationService.getNotification(userID);
    }
}
