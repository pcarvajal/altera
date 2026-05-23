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
  @IsDateString()
  generationDate!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rejectDetails?: string;
}
