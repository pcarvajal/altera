import { StringValueObject } from 'shared';
import { ClientNameEmptyError } from '../errors/ClientNameEmptyError';
import { ClientNameLengthError } from '../errors/ClientNameLengthError';

export class ClientName extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensureClientNameIsNotEmpty(value);
    this.ensureClientNameLengthIsValid(value);
  }

  ensureClientNameIsNotEmpty(value: string): void {
    if (value.trim() === '') {
      throw new ClientNameEmptyError();
    }
  }

  ensureClientNameLengthIsValid(value: string): void {
    const length = value.trim().length;
    if (length < 2 || length > 100) {
      throw new ClientNameLengthError(value);
    }
  }
}
