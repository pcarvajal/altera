import { CreateUserCommand } from './commands/CreateUserCommand';

export abstract class UserApplication {
  abstract createUser(command: CreateUserCommand): Promise<void>;
}
