import { DomainError } from 'shared';

export class PasswordMissingUppercaseError extends DomainError {
  type = 'PasswordMissingUppercaseError';
  message = 'Password must contain at least one uppercase letter';

  constructor() {
    super('Password must contain at least one uppercase letter');
  }
}
