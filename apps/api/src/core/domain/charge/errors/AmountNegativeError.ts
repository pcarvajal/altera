import { DomainError } from 'shared';

export class AmountNegativeError extends DomainError {
  type = 'AmountNegativeError';
  message = "Amount can't be negative";

  constructor(value: number) {
    super(`Amount can't be negative: ${value}`);
  }
}
