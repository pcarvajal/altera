import { CreateChargeCommand } from './commands/CreateChargeCommand';

export abstract class ChargeApplication {
  abstract createCharge(command: CreateChargeCommand): Promise<void>;
}
