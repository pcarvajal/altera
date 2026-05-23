import { User } from '../../User';

export interface UserService {
  save(user: User): Promise<User>;
}
