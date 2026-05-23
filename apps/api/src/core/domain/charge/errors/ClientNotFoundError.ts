import { DomainError } from 'shared';

export class ClientNotFoundError extends DomainError {
  type = 'ClientNotFoundError';
  message = 'Client not found';

  constructor(clientId: string) {
    super(`Client not found: ${clientId}`);
  }
}
