import { Charge } from '../Charge';
import { ChargeService } from '../ports/inputs/ChargeService';
import { ChargeRepository } from '../ports/outputs/ChargeRepository';

export class ChargeDomainService implements ChargeService {
  constructor(private readonly chargeRepository: ChargeRepository) {}

  async save(charge: Charge): Promise<Charge> {
    return this.chargeRepository.save(charge);
  }
}
