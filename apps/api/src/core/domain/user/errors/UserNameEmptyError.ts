import { DomainError } from 'shared';

export class UserNameEmptyError extends DomainError {
  type = 'UserNameEmptyError';
  message = 'User name cannot be empty';

  constructor() {
    super('User name cannot be empty');
  }
}
