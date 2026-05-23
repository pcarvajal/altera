import { UserService } from '../ports/inputs/UserService';
import { UserRepository } from '../ports/outputs/UserRepository';
import { User } from '../User';

export class UserDomainService implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
