import { DateValueObject, InvalidArgumentError } from 'shared';

export class GenerationDate extends DateValueObject {
  constructor({ value }: { value: Date }) {
    super({ value });
    this.ensureValueIsValid(value);
    this.ensureValueIsNotPast(value);
  }

  private ensureValueIsValid(value: Date): void {
    if (isNaN(value.getTime())) {
      throw new InvalidArgumentError({
        message: 'Generation Date must be a valid date'
      });
    }
  }

  private ensureValueIsNotPast(value: Date): void {
    const now = new Date();
    const pastDate = new Date(now.setDate(now.getDate() - 2));
    if (value < pastDate) {
      throw new InvalidArgumentError({
        message: `Generation Date cannot be in the past (${value.toISOString()}), tolerance is 2 days`
      });
    }
  }
}
