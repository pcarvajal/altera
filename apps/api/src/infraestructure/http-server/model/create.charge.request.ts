import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateChargeRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference!: string;

  @ApiProperty()
  @IsUUID()
  clientId!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount!: number;
}
