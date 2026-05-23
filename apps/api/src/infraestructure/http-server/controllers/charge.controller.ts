import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { CHARGE_APPLICATION } from '../../../core/core.module';
import { CreateChargeRequest } from '../model/create.charge.request';
import { ChargeApplication } from '../../../core/application/charge/ChargeApplication';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../../core/domain/user/enums/Role';
import { Roles } from '../decorators/roles.decorator';

@Controller('charges')
export class ChargeController {
  constructor(@Inject(CHARGE_APPLICATION) private readonly chargeApplication: ChargeApplication) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() body: CreateChargeRequest): Promise<void> {
    await this.chargeApplication.createCharge({
      clientId: body.clientId,
      generationDate: new Date(body.generationDate),
      state: body.state,
      amount: body.amount,
      reference: body.reference,
      rejectDetails: body.rejectDetails,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
