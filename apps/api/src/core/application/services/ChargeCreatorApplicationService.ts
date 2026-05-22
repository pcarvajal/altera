import { Charge } from '../../domain/entities/Charge';
import { ChargeScalars } from '../../domain/entities/ChargeScalars';
import { ChargeDomainService } from '../../domain/services/ChargeDomainService';
import { ChargeApplication } from '../ChargeApplication';

export class ChargeApplicationService implements ChargeApplication {
  constructor(private readonly chargeDomainService: ChargeDomainService) {}

  async createCharge(newCharge: ChargeScalars): Promise<void> {
    const charge = Charge.create(newCharge);
    await this.chargeDomainService.save(charge);
  }
}
