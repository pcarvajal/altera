import { Client } from '../../Client';

export interface ClientService {
  save(client: Client): Promise<Client>;
}
