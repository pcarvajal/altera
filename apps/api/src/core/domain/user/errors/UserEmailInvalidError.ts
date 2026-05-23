import { DomainError } from 'shared';

export class UserEmailInvalidError extends DomainError {
  type = 'UserEmailInvalidError';
  message = 'User email is invalid';

  constructor(value: string) {
    super(`User email is invalid, got "${value}"`);
  }
}
