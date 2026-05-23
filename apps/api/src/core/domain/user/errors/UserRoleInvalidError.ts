import { DomainError } from 'shared';
import { Role } from '../enums/Role';

export class UserRoleInvalidError extends DomainError {
  type = 'UserRoleInvalidError';
  message = 'User role is invalid';

  constructor(value: string) {
    super(`User role must be one of: ${Object.values(Role).join(', ')}, got "${value}"`);
  }
}
