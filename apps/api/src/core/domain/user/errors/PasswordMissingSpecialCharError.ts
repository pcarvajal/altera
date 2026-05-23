import { DomainError } from 'shared';

export class PasswordMissingSpecialCharError extends DomainError {
  type = 'PasswordMissingSpecialCharError';
  message = 'Password must contain at least one special character (@$!%*?&)';

  constructor() {
    super('Password must contain at least one special character (@$!%*?&)');
  }
}
