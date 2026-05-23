import { DomainError } from 'shared';

export class ClientNameLengthError extends DomainError {
  type = 'ClientNameLengthError';
  message = 'Client name must be between 2 and 100 characters';

  constructor(value: string) {
    super(`Client name must be between 2 and 100 characters, got "${value}"`);
  }
}
