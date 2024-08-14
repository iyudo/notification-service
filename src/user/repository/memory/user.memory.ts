import { Injectable } from '@nestjs/common';
import { UserRepository as UserRepositoryInterface } from '../user.repository';
import { User, Company } from '../../models/user.models';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    private users: Map<string, User>;

    constructor() {
        this.users = new Map<string, User>();

        this.users.set('user-a', {
            id: 'user-a',
            name: 'Alice',
            company: {
                id: 'company-a',
                name: 'Apple',
            },
        });

        this.users.set('user-b', {
            id: 'user-b',
            name: 'Bob',
            company: {
                id: 'company-b',
                name: 'Banana',
            },
        });

        this.users.set('user-c', {
            id: 'user-c',
            name: 'Charlie',
            company: {
                id: 'company-c',
                name: 'Citrus',
            },
        });
    }

    findByID(id: string): Promise<User> {
        return Promise.resolve(this.users.get(id) || null);
    }
}
