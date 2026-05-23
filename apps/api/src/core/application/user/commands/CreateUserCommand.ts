import { Role } from '../../../domain/user/enums/Role';

export interface CreateUserCommand {
  name: string;
  email: string;
  password: string;
  role: Role;
}
