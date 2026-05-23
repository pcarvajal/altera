import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
