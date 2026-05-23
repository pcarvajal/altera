import { StringValueObject } from 'shared';
import { UserNameEmptyError } from '../errors/UserNameEmptyError';
import { UserNameLengthError } from '../errors/UserNameLengthError';

export class UserName extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensureUserNameIsNotEmpty(value);
    this.ensureUserNameLengthIsValid(value);
  }

  ensureUserNameIsNotEmpty(value: string): void {
    if (value.trim() === '') {
      throw new UserNameEmptyError();
    }
  }

  ensureUserNameLengthIsValid(value: string): void {
    const length = value.trim().length;
    if (length < 2 || length > 100) {
      throw new UserNameLengthError(value);
    }
  }
}
