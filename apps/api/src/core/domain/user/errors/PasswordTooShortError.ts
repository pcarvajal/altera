import { DomainError } from 'shared';

export class PasswordTooShortError extends DomainError {
  type = 'PasswordTooShortError';
  message = 'Password must be at least 8 characters long';

  constructor() {
    super('Password must be at least 8 characters long');
  }
}
