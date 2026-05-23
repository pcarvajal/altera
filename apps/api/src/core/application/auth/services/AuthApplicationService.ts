import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthApplication, LoginInput, LoginOutput } from '../AuthApplication';
import { UserRepository } from '../../../domain/user/ports/outputs/UserRepository';
import { TokenPort } from '../../../domain/user/ports/outputs/TokenPort';
import { UserEmail } from '../../../domain/user/value-objects/UserEmail';

export class AuthApplicationService extends AuthApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenPort: TokenPort
  ) {
    super();
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(new UserEmail({ value: email }));
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const scalars = user.toScalars();
    const passwordMatch = await bcrypt.compare(password, scalars.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.tokenPort.sign({
      sub: scalars.id!,
      email: scalars.email,
      role: scalars.role
    });

    return { accessToken };
  }
}
