import { DomainError } from 'shared';

export class ChargeNotFoundError extends DomainError {
  type = 'ChargeNotFoundError';
  message = 'Charge not found';

  constructor(chargeId: string) {
    super(`Charge not found: ${chargeId}`);
  }
}
