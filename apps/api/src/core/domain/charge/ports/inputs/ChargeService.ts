import { Charge } from '../../Charge';

export interface ChargeService {
  save(charge: Charge): Promise<Charge>;
}
