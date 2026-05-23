import { Uuid } from 'shared';
import { ChargeApplication } from '../ChargeApplication';
import { ChargeDomainService } from '../../../domain/charge/services/ChargeDomainService';
import { Charge } from '../../../domain/charge/Charge';
import { ChargeScalar } from '../../../domain/charge/ChargeScalar';

export class ChargeApplicationService extends ChargeApplication {
  constructor(private readonly chargeDomainService: ChargeDomainService) {
    super();
  }

  async createCharge(input: ChargeScalar): Promise<void> {
    const charge = Charge.create({ id: Uuid.random().value, ...input });
    await this.chargeDomainService.save(charge);
  }
}
