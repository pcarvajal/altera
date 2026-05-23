import { ChargeId, ClientId, Nullable } from 'shared';
import { Charge } from '../../Charge';

export interface ChargeRepository {
  save(charge: Charge): Promise<Charge>;
  findById(id: ChargeId): Promise<Nullable<Charge>>;
  findAll(): Promise<Charge[]>;
  findByClientId(clientId: ClientId): Promise<Charge[]>;
}
