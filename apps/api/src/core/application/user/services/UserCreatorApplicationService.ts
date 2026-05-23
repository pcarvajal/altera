import { Uuid } from 'shared';
import { UserApplication } from '../UserApplication';
import { UserRepository } from '../../../domain/user/ports/outputs/UserRepository';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { User } from '../../../domain/user/User';

export class UserApplicationService extends UserApplication {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async createUser(command: CreateUserCommand): Promise<void> {
    const user = User.create({ id: Uuid.random().value, ...command });
    await this.userRepository.save(user);
  }
}
