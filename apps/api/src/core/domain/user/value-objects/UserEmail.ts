import { StringValueObject } from 'shared';
import { UserEmailInvalidError } from '../errors/UserEmailInvalidError';

export class UserEmail extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensureEmailIsValid(value);
  }

  ensureEmailIsValid(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new UserEmailInvalidError(value);
    }
  }
}
