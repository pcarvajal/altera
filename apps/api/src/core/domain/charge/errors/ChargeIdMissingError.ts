import { DomainError } from 'shared';

export class ChargeIdMissingError extends DomainError {
  type = 'ChargeIdMissingError';
  message = 'Charge ID is missing';

  constructor() {
    super('Charge ID is missing');
  }
}
