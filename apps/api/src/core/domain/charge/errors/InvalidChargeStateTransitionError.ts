import { DomainError } from 'shared';

export class InvalidChargeStateTransitionError extends DomainError {
  type = 'InvalidChargeStateTransitionError';
  message = 'Invalid charge state transition';

  constructor(from: string, to: string) {
    super(`Invalid charge state transition from ${from} to ${to}`);
  }
}
