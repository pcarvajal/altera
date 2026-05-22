import { ChargeScalars } from '../domain/entities/ChargeScalars';

export interface ChargeApplication {
  createCharge(newCharge: ChargeScalars): Promise<void>;
}
