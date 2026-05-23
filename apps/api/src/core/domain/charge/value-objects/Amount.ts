import { NumberValueObject } from 'shared';
import { AmountNegativeError } from '../errors/AmountNegativeError';

export class Amount extends NumberValueObject {
  constructor({ value }: { value: number }) {
    super({ value });
    if (value < 0) {
      throw new AmountNegativeError(value);
    }
  }
}
