import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserRepository as UserRepositoryImpl } from './repository/memory/user.memory'

@Module({
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl
        }
    ],
    exports: ['UserRepository']
})
export class UserModule { }
