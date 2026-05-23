import { InvalidArgumentError, StringValueObject } from 'shared';

export class Reference extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensureValueIsNotEmpty(value);
    this.ensureValueIsNotTooLong(value);
  }

  private ensureValueIsNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      throw new InvalidArgumentError({ message: 'Reference cannot be empty.' });
    }
  }

  private ensureValueIsNotTooLong(value: string): void {
    const maxLength = 255;
    if (value.length > maxLength) {
      throw new InvalidArgumentError({
        message: `Reference exceeds maximum length of ${maxLength} characters.`
      });
    }
  }
}
