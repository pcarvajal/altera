import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RejectChargeRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rejectDetails!: string;
}
