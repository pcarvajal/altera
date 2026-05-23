import { ChargeId, ClientId, Nullable } from 'shared';
import { Charge } from '../../Charge';

export interface ChargeRepository {
  save(charge: Charge): Promise<Charge>;
  find(
    page: number,
    pageSize: number,
    state?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Charge[]>;
  findById(id: ChargeId): Promise<Nullable<Charge>>;
  findAll(): Promise<Charge[]>;
  findByClientId(clientId: ClientId): Promise<Charge[]>;
}
