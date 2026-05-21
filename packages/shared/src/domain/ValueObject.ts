import { InvalidArgumentError } from './InvalidArgumentError';
import { Scalar } from './Scalar';

export abstract class ValueObject<T extends Scalar> {
  readonly value: T;

  constructor({ value }: { value: T }) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError({
        message: 'Value object is not defined'
      });
    }
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
