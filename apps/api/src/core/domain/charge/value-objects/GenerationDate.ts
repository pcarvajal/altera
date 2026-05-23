import { DateValueObject, InvalidArgumentError } from 'shared';

export class GenerationDate extends DateValueObject {
  constructor({ value }: { value: Date }) {
    super({ value });
    this.ensureValueIsValid(value);
  }

  private ensureValueIsValid(value: Date): void {
    if (isNaN(value.getTime())) {
      throw new InvalidArgumentError({
        message: 'Generation Date must be a valid date'
      });
    }
  }
}
