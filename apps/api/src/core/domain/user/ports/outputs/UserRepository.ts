import { Nullable } from 'shared';
import { User } from '../../User';
import { UserEmail } from '../../value-objects/UserEmail';

export interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: UserEmail): Promise<Nullable<User>>;
}
