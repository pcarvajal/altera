import { DomainError } from 'shared';

export class PasswordMissingNumberError extends DomainError {
  type = 'PasswordMissingNumberError';
  message = 'Password must contain at least one number';

  constructor() {
    super('Password must contain at least one number');
  }
}
