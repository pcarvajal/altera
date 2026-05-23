import { DomainError } from 'shared';

export class ClientIdMissingError extends DomainError {
  type = 'ClientIdMissingError';
  message = 'Client ID is missing';

  constructor() {
    super('Client ID is missing');
  }
}
