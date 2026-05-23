import { Client } from '../Client';
import { ClientService } from '../ports/inputs/ClientService';
import { ClientRepository } from '../ports/outputs/ClientRepository';

export class ClientDomainService implements ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async save(client: Client): Promise<Client> {
    return this.clientRepository.save(client);
  }
}
