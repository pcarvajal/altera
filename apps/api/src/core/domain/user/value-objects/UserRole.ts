import { EnumValueObject } from 'shared';
import { Role } from '../enums/Role';
import { UserRoleInvalidError } from '../errors/UserRoleInvalidError';

export class UserRole extends EnumValueObject<string> {
  constructor({ value }: { value: string }) {
    super({ value, validValues: Object.values(Role) });
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new UserRoleInvalidError(value);
  }
}
