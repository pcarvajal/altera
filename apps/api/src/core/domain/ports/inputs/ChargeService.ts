import { Charge } from '../../entities/Charge';

export interface ChargeService {
  save(charge: Charge): Promise<Charge>;
}
