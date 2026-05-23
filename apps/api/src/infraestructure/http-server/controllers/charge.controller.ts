import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { CHARGE_APPLICATION } from '../../../core/core.module';
import { CreateChargeRequest } from '../model/create.charge.request';
import { ChargeApplication } from '../../../core/application/charge/ChargeApplication';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../../core/domain/user/enums/Role';
import { Roles } from '../decorators/roles.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RejectChargeRequest } from '../model/reject.charge.request';
import { GetChargeResponse } from '../model/get.charge.response';

@Controller('charges')
@ApiBearerAuth()
export class ChargeController {
  constructor(@Inject(CHARGE_APPLICATION) private readonly chargeApplication: ChargeApplication) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() body: CreateChargeRequest): Promise<void> {
    await this.chargeApplication.createCharge({
      clientId: body.clientId,
      reference: body.reference,
      amount: body.amount
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string): Promise<GetChargeResponse> {
    const charge = await this.chargeApplication.getChargeById({ id });
    return {
      id: charge.id!,
      clientId: charge.clientId,
      reference: charge.reference,
      amount: charge.amount,
      state: charge.state,
      rejectDetails: charge.rejectDetails
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'state',
    required: false,
    enum: ['PENDING', 'REVIEWED', 'CONFIRMED', 'REJECTED']
  })
  @ApiQuery({ name: 'fromDate', required: false, type: String, example: '2026-01-01' })
  @ApiQuery({ name: 'toDate', required: false, type: String, example: '2026-12-31' })
  async find(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('state') state?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string
  ): Promise<GetChargeResponse[]> {
    const charges = await this.chargeApplication.getCharges({
      page: Number(page),
      pageSize: Number(pageSize),
      state,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined
    });
    return charges.map((charge) => ({
      id: charge.id!,
      clientId: charge.clientId,
      reference: charge.reference,
      amount: charge.amount,
      state: charge.state,
      rejectDetails: charge.rejectDetails
    }));
  }

  @Patch(':id/review')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async review(@Param('id') id: string): Promise<void> {
    await this.chargeApplication.updateChargeState({
      id,
      newState: 'REVIEWED'
    });
  }

  @Patch(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async confirm(@Param('id') id: string): Promise<void> {
    await this.chargeApplication.updateChargeState({
      id,
      newState: 'CONFIRMED'
    });
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async reject(@Param('id') id: string, @Body() body: RejectChargeRequest): Promise<void> {
    await this.chargeApplication.updateChargeState({
      id,
      newState: 'REJECTED',
      rejectDetails: body.rejectDetails
    });
  }
}
