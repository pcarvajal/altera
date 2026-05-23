import { DomainError } from 'shared';

export class UserNameLengthError extends DomainError {
  type = 'UserNameLengthError';
  message = 'User name must be between 2 and 100 characters';

  constructor(value: string) {
    super(`User name must be between 2 and 100 characters, got "${value}"`);
  }
}
