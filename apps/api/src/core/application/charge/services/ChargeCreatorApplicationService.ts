import { ChargeId, Uuid } from 'shared';
import { ChargeApplication } from '../ChargeApplication';
import { ChargeRepository } from '../../../domain/charge/ports/outputs/ChargeRepository';
import { ClientFinder } from '../../../domain/charge/ports/outputs/ClientFinder';
import { CreateChargeCommand } from '../commands/CreateChargeCommand';
import { Charge } from '../../../domain/charge/Charge';
import { ClientNotFoundError } from '../../../domain/charge/errors/ClientNotFoundError';
import { ChargeNotFoundError } from '../../../domain/charge/errors/ChargeNotFoundError';
import { UpdateChargeStateCommand } from '../commands/UpdateChargeStateCommand';
import { GetChargeByIdCommand } from '../commands/GetChargeByIdCommand';
import { ChargeScalar } from '../../../domain/charge/ChargeScalar';
import { GetChargesCommand } from '../commands/GetChargesCommand';

export class ChargeApplicationService extends ChargeApplication {
  constructor(
    private readonly chargeRepository: ChargeRepository,
    private readonly clientFinder: ClientFinder
  ) {
    super();
  }

  async createCharge(command: CreateChargeCommand): Promise<void> {
    await this.ensureClientExists(command.clientId);
    const charge = Charge.create({
      id: Uuid.random().value,
      state: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      generationDate: new Date(),
      ...command,
      rejectDetails: ''
    });
    await this.chargeRepository.save(charge);
  }

  private async ensureClientExists(clientId: string): Promise<void> {
    const clientExists = await this.clientFinder.existsById(clientId);
    if (!clientExists) {
      throw new ClientNotFoundError(clientId);
    }
  }

  async updateChargeState(command: UpdateChargeStateCommand): Promise<void> {
    const charge = await this.chargeRepository.findById(new ChargeId({ value: command.id }));
    if (!charge) {
      throw new ChargeNotFoundError(command.id);
    }
    charge.updateState(command.newState, command.rejectDetails);
    await this.chargeRepository.save(charge);
  }

  async getChargeById(command: GetChargeByIdCommand): Promise<ChargeScalar> {
    const charge = await this.chargeRepository.findById(new ChargeId({ value: command.id }));
    if (!charge) {
      throw new ChargeNotFoundError(command.id);
    }
    return charge.toScalars();
  }

  async getCharges(command: GetChargesCommand): Promise<ChargeScalar[]> {
    const charges = await this.chargeRepository.find(
      command.page,
      command.pageSize,
      command.state,
      command.fromDate,
      command.toDate
    );
    return charges.map((charge) => charge.toScalars());
  }
}
