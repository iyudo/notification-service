import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './models/notification.models';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    async process(@Body() notification: Notification) {
        return this.notificationService.process(notification);
    }

    @Get()
    async getContent(
        @Query('notificationType') notificationType: string,
        @Query('notificationChannel') notificationChannel: string
    ) {
        return this.notificationService.getContent(notificationType, notificationChannel);
    }
}
