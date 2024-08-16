import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification, NotificationSchema } from './models/mongoose/notification.mongoose';
import { NotificationChannel, NotificationChannelSchema } from './models/mongoose/notification-channel.mongoose';
import { NotificationChannelSubscription, NotificationChannelSubscriptionSchema } from './models/mongoose/notification-channel-subscription.mongoose';
import { NotificationContent, NotificationContentSchema } from './models/mongoose/notification-content.mongoose';
import { NotificationRepository } from './repository/mongoose/notification.mongoose';
import { NotificationChannelRepository } from './repository/mongoose/notification-channel.mongoose';
import { NotificationChannelSubscriptionRepository } from './repository/mongoose/notification-channel-subscription.mongoose';
import { NotificationContentRepository } from './repository/mongoose/notification-content.mongoose';
import { NotificationChannelStrategyFactory } from './factory/notification-channel-strategy.factory'
import { NotificationChannelStrategy } from './strategy/notification-channel/notification-channel.strategy';
import { UIChannelStrategy } from './strategy/notification-channel/ui-channel.strategy';
import { EmailChannelStrategy } from './strategy/notification-channel/email-channel.strategy';
import { NotificationContentStrategyFactory } from './factory/notification-content-strategy.factory'
import { NotificationContentStrategy } from './strategy/notification-content/notification-content.strategy';
import { HappyBirthdayUIStrategy } from './strategy/notification-content/happy-birthday-ui.strategy';
import { HappyBirthdayEmailStrategy } from './strategy/notification-content/happy-birthday-email.strategy';
import { LeaveBalanceReminderUIStrategy } from './strategy/notification-content/leave-balance-reminder-ui.strategy';
import { MonthlyPayslipEmailStrategy } from './strategy/notification-content/monthly-payslip-email.strategy';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: NotificationChannel.name, schema: NotificationChannelSchema }]),
    MongooseModule.forFeature([{ name: NotificationChannelSubscription.name, schema: NotificationChannelSubscriptionSchema }]),
    MongooseModule.forFeature([{ name: NotificationContent.name, schema: NotificationContentSchema }])
  ],
  controllers: [NotificationController],
  providers: [
    NotificationChannelStrategyFactory,
    UIChannelStrategy,
    EmailChannelStrategy,
    NotificationService,
    NotificationContentStrategyFactory,
    HappyBirthdayUIStrategy,
    HappyBirthdayEmailStrategy,
    LeaveBalanceReminderUIStrategy,
    MonthlyPayslipEmailStrategy,
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
    {
      provide: 'NotificationContentRepository',
      useClass: NotificationContentRepository
    },
    {
      provide: 'NotificationChannelStrategyProvider',
      useFactory: (strategyUI: UIChannelStrategy, strategyEmail: EmailChannelStrategy) => {
        const strategyMap = new Map<string, NotificationChannelStrategy>();
        strategyMap.set('ui', strategyUI);
        strategyMap.set('email', strategyEmail);
        return strategyMap;
      },
      inject: [UIChannelStrategy, EmailChannelStrategy],
    },
    {
      provide: 'NotificationContentStrategyProvider',
      useFactory: (
        strategyHappyBirthdayUI: HappyBirthdayUIStrategy, 
        strategyHappyBirthdayEmail: HappyBirthdayEmailStrategy,
        strategyLeaveBalanceReminderUI: LeaveBalanceReminderUIStrategy,
        strategyMonthlyPayslipEmail: MonthlyPayslipEmailStrategy
      ) => {
        const strategyMap = new Map<string, Map<string, NotificationContentStrategy>>();
        strategyMap.set('ui', new Map<string, NotificationContentStrategy>());
        strategyMap.set('email', new Map<string, NotificationContentStrategy>());

        strategyMap.get('ui').set('happy-birthday', strategyHappyBirthdayUI);
        strategyMap.get('email').set('happy-birthday', strategyHappyBirthdayEmail);

        strategyMap.get('ui').set('leave-balance-reminder', strategyLeaveBalanceReminderUI);

        strategyMap.get('email').set('monthly-payslip', strategyMonthlyPayslipEmail);
        return strategyMap;
      },
      inject: [
        HappyBirthdayUIStrategy, 
        HappyBirthdayEmailStrategy,
        LeaveBalanceReminderUIStrategy,
        MonthlyPayslipEmailStrategy
      ],
    },
  ]
})
export class NotificationModule {}
