import { DomainError } from 'shared';

export class InvalidCredentialsError extends DomainError {
  type = 'InvalidCredentialsError';
  message = 'Invalid credentials';
}
