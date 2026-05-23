import { ApiProperty } from '@nestjs/swagger';
import { ClientScalar } from '../../../core/domain/client/ClientScalar';

export class CreateClientRequest implements ClientScalar {
  @ApiProperty()
  name!: string;
}
