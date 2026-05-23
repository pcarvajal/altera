import { ApiProperty } from '@nestjs/swagger';
import { UserScalar } from '../../../core/domain/user/UserScalar';

export class CreateUserRequest implements UserScalar {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  password!: string;
  @ApiProperty()
  role!: string;
}
