import { User } from '../models/user.models';

export interface UserRepository {
  findByID(id: string): Promise<User>;
}