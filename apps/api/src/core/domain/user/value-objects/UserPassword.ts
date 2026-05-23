import { StringValueObject } from 'shared';
import { PasswordMissingLowercaseError } from '../errors/PasswordMissingLowercaseError';
import { PasswordMissingNumberError } from '../errors/PasswordMissingNumberError';
import { PasswordMissingSpecialCharError } from '../errors/PasswordMissingSpecialCharError';
import { PasswordMissingUppercaseError } from '../errors/PasswordMissingUppercaseError';
import { PasswordTooShortError } from '../errors/PasswordTooShortError';

export class UserPassword extends StringValueObject {
  constructor({ value }: { value: string }) {
    super({ value });
    this.ensurePasswordIsValid(value);
  }

  static fromHash(hash: string): UserPassword {
    return new UserPassword({ value: hash });
  }

  static fromPlain(plain: string): UserPassword {
    const vo = new UserPassword({ value: plain });
    vo.ensurePasswordIsValid(plain);
    return vo;
  }

  ensurePasswordIsValid(value: string): void {
    if (value.length < 8) throw new PasswordTooShortError();
    if (!/[A-Z]/.test(value)) throw new PasswordMissingUppercaseError();
    if (!/[a-z]/.test(value)) throw new PasswordMissingLowercaseError();
    if (!/[0-9]/.test(value)) throw new PasswordMissingNumberError();
    if (!/[@$!%*?&]/.test(value)) throw new PasswordMissingSpecialCharError();
  }
}
