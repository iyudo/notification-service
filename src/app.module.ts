import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    NotificationModule,
    // MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017/notifications?authSource=admin'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log("Greetings from AppModule");
    console.log(process.env.MONGO_URI);
  }
}
