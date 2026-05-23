import { DomainError } from 'shared';

export class PasswordMissingLowercaseError extends DomainError {
  type = 'PasswordMissingLowercaseError';
  message = 'Password must contain at least one lowercase letter';

  constructor() {
    super('Password must contain at least one lowercase letter');
  }
}
