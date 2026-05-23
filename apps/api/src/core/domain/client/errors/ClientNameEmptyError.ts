import { DomainError } from 'shared';

export class ClientNameEmptyError extends DomainError {
  type = 'ClientNameEmptyError';
  message = 'Client name cannot be empty';

  constructor() {
    super('Client name cannot be empty');
  }
}
