import { InvalidArgumentError, StringValueObject } from 'shared';

export class RejectDetails extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensureValueIsNotEmpty(value);
    this.ensureValueIsNotTooShort(value);
    this.ensureValueIsNotTooLong(value);
  }

  private ensureValueIsNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      throw new InvalidArgumentError({ message: 'Reject Details cannot be empty.' });
    }
  }

  private ensureValueIsNotTooLong(value: string): void {
    const maxLength = 255;
    if (value.length > maxLength) {
      throw new InvalidArgumentError({
        message: `Reject Details exceeds maximum length of ${maxLength} characters.`
      });
    }
  }

  private ensureValueIsNotTooShort(value: string): void {
    const minLength = 10;
    if (value.length < minLength) {
      throw new InvalidArgumentError({
        message: `Reject Details must be at least ${minLength} characters long.`
      });
    }
  }
}
