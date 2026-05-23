import { Charge } from '../../domain/charge/Charge';
import { ChargeScalar } from '../../domain/charge/ChargeScalar';
import { CreateChargeCommand } from './commands/CreateChargeCommand';
import { GetChargeByIdCommand } from './commands/GetChargeByIdCommand';
import { GetChargesCommand } from './commands/GetChargesCommand';
import { UpdateChargeStateCommand } from './commands/UpdateChargeStateCommand';

export abstract class ChargeApplication {
  abstract createCharge(command: CreateChargeCommand): Promise<void>;
  abstract updateChargeState(command: UpdateChargeStateCommand): Promise<void>;
  abstract getChargeById(command: GetChargeByIdCommand): Promise<ChargeScalar>;
  abstract getCharges(command: GetChargesCommand): Promise<ChargeScalar[]>;
}
