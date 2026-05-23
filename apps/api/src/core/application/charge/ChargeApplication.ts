import { ChargeScalar } from '../../domain/charge/ChargeScalar';

export abstract class ChargeApplication {
  abstract createCharge(input: ChargeScalar): Promise<void>;
}
