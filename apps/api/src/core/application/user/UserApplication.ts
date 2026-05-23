import { UserScalar } from '../../domain/user/UserScalar';

export abstract class UserApplication {
  abstract createUser(input: UserScalar): Promise<void>;
}
