import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { UserModule } from '../user/user.module';
import { NotificationService } from './notification.service';
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

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      imports: [
        UserModule
      ],
      providers: [
        NotificationService,
        NotificationChannelStrategyFactory,
        UIChannelStrategy,
        EmailChannelStrategy,
        NotificationService,
        NotificationContentStrategyFactory,
        HappyBirthdayUIStrategy,
        HappyBirthdayEmailStrategy,
        {
          provide: 'NotificationRepository',
          useValue: {
            // Mock the methods of your repository here
            findByUserID: jest.fn()
            // Add other methods as needed
          },
        },
        {
          provide: 'NotificationChannelRepository',
          useValue: {
            // Mock the methods of your repository here
            findByUserID: jest.fn()
            // Add other methods as needed
          },
        },
        {
          provide: 'NotificationChannelSubscriptionRepository',
          useValue: {
            // Mock the methods of your repository here
            findByUserID: jest.fn()
            // Add other methods as needed
          },
        },
        {
          provide: 'NotificationContentRepository',
          useValue: {
            // Mock the methods of your repository here
            findByUserID: jest.fn()
            // Add other methods as needed
          },
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
            strategyHappyBirthdayEmail: HappyBirthdayEmailStrategy
          ) => {
            const strategyMap = new Map<string, Map<string, NotificationContentStrategy>>();
            strategyMap.set('ui', new Map<string, NotificationContentStrategy>());
            strategyMap.set('email', new Map<string, NotificationContentStrategy>());

            strategyMap.get('ui').set('happy-birthday', strategyHappyBirthdayUI);
            strategyMap.get('email').set('happy-birthday', strategyHappyBirthdayEmail);
            return strategyMap;
          },
          inject: [
            HappyBirthdayUIStrategy,
            HappyBirthdayEmailStrategy
          ],
        },
      ],
    }).compile();
    
    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
