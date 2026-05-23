import { DomainError } from 'shared';
import { State } from '../enums/State';

export class InvalidInitialChargeStateError extends DomainError {
  type = 'InvalidInitialChargeStateError';
  message = `Initial charge state is invalid`;

  constructor() {
    super(`Initial charge state is invalid - it must be ${State.PENDING}`);
  }
}
