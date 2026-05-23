import { Client } from '../../Client';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
}
