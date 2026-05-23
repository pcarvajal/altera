import { Uuid } from 'shared';
import { ChargeApplication } from '../ChargeApplication';
import { ChargeRepository } from '../../../domain/charge/ports/outputs/ChargeRepository';
import { ClientFinder } from '../../../domain/charge/ports/outputs/ClientFinder';
import { CreateChargeCommand } from '../commands/CreateChargeCommand';
import { Charge } from '../../../domain/charge/Charge';
import { ClientNotFoundError } from '../../../domain/charge/errors/ClientNotFoundError';

export class ChargeApplicationService extends ChargeApplication {
  constructor(
    private readonly chargeRepository: ChargeRepository,
    private readonly clientFinder: ClientFinder
  ) {
    super();
  }

  async createCharge(command: CreateChargeCommand): Promise<void> {
    const clientExists = await this.clientFinder.existsById(command.clientId);
    if (!clientExists) throw new ClientNotFoundError(command.clientId);

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
