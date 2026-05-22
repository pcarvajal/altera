import { Charge } from '../../entities/Charge';

export interface ChargeRepository {
  save(charge: Charge): Promise<Charge>;
}
