import { DomainError } from 'shared';

export class RejectDetailsError extends DomainError {
  type = 'RejectDetailsError';
  message = 'Reject details are required';

  constructor() {
    super('Reject details are required for rejecting a charge');
  }
}
