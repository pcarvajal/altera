import { ApiProperty } from '@nestjs/swagger';

export class CreateChargeRequest {
  @ApiProperty()
  reference!: string;
  @ApiProperty()
  clientId!: string;
  @ApiProperty()
  generationDate!: Date;
  @ApiProperty()
  state!: string;
  @ApiProperty()
  amount!: number;
  @ApiProperty()
  rejectDetails!: string;
}
