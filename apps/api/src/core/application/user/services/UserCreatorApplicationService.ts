import { Uuid } from 'shared';
import { UserApplication } from '../UserApplication';
import { UserScalar } from '../../../domain/user/UserScalar';
import { User } from '../../../domain/user/User';
import { UserDomainService } from '../../../domain/user/services/UserDomainService';

export class UserApplicationService extends UserApplication {
  constructor(private readonly userDomainService: UserDomainService) {
    super();
  }

  async createUser(input: UserScalar): Promise<void> {
    const user = User.create({ id: Uuid.random().value, ...input });
    await this.userDomainService.save(user);
  }
}
