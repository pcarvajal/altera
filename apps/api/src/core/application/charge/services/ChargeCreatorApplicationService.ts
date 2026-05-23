import { Uuid } from 'shared';
import { ChargeApplication } from '../ChargeApplication';
import { ChargeRepository } from '../../../domain/charge/ports/outputs/ChargeRepository';
import { CreateChargeCommand } from '../commands/CreateChargeCommand';
import { Charge } from '../../../domain/charge/Charge';

export class ChargeApplicationService extends ChargeApplication {
  constructor(private readonly chargeRepository: ChargeRepository) {
    super();
  }

  async createCharge(command: CreateChargeCommand): Promise<void> {
    const charge = Charge.create({
      id: Uuid.random().value,
      state: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...command,
      rejectDetails: command.rejectDetails ?? ''
    });
    await this.chargeRepository.save(charge);
  }
}
