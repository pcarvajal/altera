import { DomainError } from 'shared';

export class UserIdMissingError extends DomainError {
  type = 'UserIdMissingError';
  message = 'User ID is missing';

  constructor() {
    super('User ID is missing');
  }
}
