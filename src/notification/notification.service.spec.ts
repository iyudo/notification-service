import { Test, TestingModule } from '@nestjs/testing';
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

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: NotificationRepository
  let notificationChannelRepository: NotificationChannelRepository
  let notificationChannelSubscriptionRepository: NotificationChannelSubscriptionRepository
  let notificationContentRepository: NotificationContentRepository
  let emailChannelStrategy: EmailChannelStrategy
  let uiChannelStrategy: UIChannelStrategy
  let happyBirthdayUIStrategy: HappyBirthdayUIStrategy
  let happyBirthdayEmailStrategy: HappyBirthdayEmailStrategy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule
      ],
      providers: [
        NotificationService,
        NotificationService,
        NotificationChannelStrategyFactory,
        NotificationContentStrategyFactory,
        {
          provide: HappyBirthdayUIStrategy,
          useValue: {
            getContentObject: jest.fn()
          },
        },
        {
          provide: HappyBirthdayEmailStrategy,
          useValue: {
            getContentObject: jest.fn()
          },
        },
        {
          provide: EmailChannelStrategy,
          useValue: {
            processNotification: jest.fn(),
            sendNotification: jest.fn()
          },
        },
        {
          provide: UIChannelStrategy,
          useValue: {
            processNotification: jest.fn(),
            sendNotification: jest.fn()
          },
        },
        {
          provide: 'NotificationRepository',
          useValue: {
            findByUserID: jest.fn()
          },
        },
        {
          provide: 'NotificationChannelRepository',
          useValue: {
            findByNotificationType: jest.fn()
          },
        },
        {
          provide: 'NotificationChannelSubscriptionRepository',
          useValue: {
            findByEntityIDAndEntityType: jest.fn()
          },
        },
        {
          provide: 'NotificationContentRepository',
          useValue: {
            findByNotificationTypeAndChannel: jest.fn()
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

    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get('NotificationRepository');
    notificationChannelRepository = module.get('NotificationChannelRepository');
    notificationChannelSubscriptionRepository = module.get('NotificationChannelSubscriptionRepository');
    notificationContentRepository = module.get('NotificationContentRepository');
    emailChannelStrategy = module.get(EmailChannelStrategy);
    uiChannelStrategy = module.get(UIChannelStrategy);
    happyBirthdayEmailStrategy = module.get(HappyBirthdayEmailStrategy);
    happyBirthdayUIStrategy = module.get(HappyBirthdayUIStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNotification', () => {
    it('should call repository findByUserID method', async () => {
      const mockResult = [
        {
          notificationType: "notification-a",
          userID: 'user-a',
          companyID: 'company-a',
          createdAt: null
        }
      ];
      jest.spyOn(notificationRepository, 'findByUserID').mockResolvedValue(mockResult);

      const result = await service.getNotification("some-id");
      expect(result).toEqual(mockResult);
      expect(notificationRepository.findByUserID).toHaveBeenCalledTimes(1);
    });
  });

  describe('process', () => {
    beforeEach(() => {
      jest.spyOn(notificationChannelRepository, 'findByNotificationType').mockImplementation(async (notificationType: string) => {
        switch (notificationType) {
          case 'leave-balance-reminder':
            return ['ui']
          case 'monthly-payslip':
            return ['email']
          case 'happy-birthday':
            return ['ui', 'email']
          default:
            return []
        }
      });
      jest.spyOn(notificationChannelSubscriptionRepository, 'findByEntityIDAndEntityType').mockImplementation(async (id: string, type: string) => {
        switch (type) {
          case 'user':
            switch (id) {
              case ('user-a'):
                return ['ui']
              case ('user-b'):
                return ['email']
              case ('user-c'):
                return ['ui']
              default:
                return []
            }
          case 'company':
            switch (id) {
              case ('company-a'):
                return ['ui']
              case ('company-b'):
                return ['email']
              case ('company-c'):
                return ['email']
              default:
                return []
            }
          default:
            return []
        }
      });
      jest.spyOn(notificationContentRepository, 'findByNotificationTypeAndChannel').mockResolvedValue({
        notificationType: 'any-type',
        notificationChannel: 'any-channel',
        notificationContent: {
          'content': 'content'
        }
      });
    });
    
    it('should process ui notification for user-a and company-a', async () => {
      const input = {
        notificationType: 'happy-birthday',
        userID: 'user-a',
        companyID: 'company-a',
        createdAt: null,
      };

      await service.process(input);

      expect(uiChannelStrategy.processNotification).toHaveBeenCalledTimes(1);
      expect(uiChannelStrategy.sendNotification).toHaveBeenCalledTimes(1);
      expect(uiChannelStrategy.processNotification).toHaveBeenCalledWith(input);
      
      expect(happyBirthdayUIStrategy.getContentObject).toHaveBeenCalledTimes(1);
    });

    it('should process email notification for user-b and company-b', async () => {
      const input = {
        notificationType: 'happy-birthday',
        userID: 'user-b',
        companyID: 'company-b',
        createdAt: null,
      };

      await service.process(input);

      expect(emailChannelStrategy.processNotification).toHaveBeenCalledTimes(1);
      expect(emailChannelStrategy.sendNotification).toHaveBeenCalledTimes(1);
      expect(emailChannelStrategy.processNotification).toHaveBeenCalledWith(input);
      
      expect(happyBirthdayEmailStrategy.getContentObject).toHaveBeenCalledTimes(1);
    });

    it('should process both ui and email notification for user-c and company-c', async () => {
      const input = {
        notificationType: 'happy-birthday',
        userID: 'user-c',
        companyID: 'company-c',
        createdAt: null,
      };

      await service.process(input);
      
      expect(uiChannelStrategy.processNotification).toHaveBeenCalledTimes(1);
      expect(uiChannelStrategy.sendNotification).toHaveBeenCalledTimes(1);
      expect(uiChannelStrategy.processNotification).toHaveBeenCalledWith(input);
      
      expect(happyBirthdayUIStrategy.getContentObject).toHaveBeenCalledTimes(1);

      expect(emailChannelStrategy.processNotification).toHaveBeenCalledTimes(1);
      expect(emailChannelStrategy.sendNotification).toHaveBeenCalledTimes(1);
      expect(emailChannelStrategy.processNotification).toHaveBeenCalledWith(input);
      
      expect(happyBirthdayEmailStrategy.getContentObject).toHaveBeenCalledTimes(1);
    });
  });
});
