import { DomainError } from './DomainError';

export class InvalidArgumentError extends DomainError {
  readonly type = 'InvalidArgumentError';
  readonly message: string;
  constructor({ message }: { message?: string }) {
    super();
    this.message = message ?? 'Invalid argument provided';
  }
}
