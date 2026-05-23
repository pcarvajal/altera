import { Uuid } from 'shared';
import { Client } from '../../../domain/client/Client';
import { ClientRepository } from '../../../domain/client/ports/outputs/ClientRepository';
import { CreateClientCommand } from '../commands/CreateClientCommand';
import { ClientApplication } from '../ClientApplication';

export class ClientApplicationService extends ClientApplication {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }

  async createClient(command: CreateClientCommand): Promise<void> {
    const client = Client.create({ id: Uuid.random().value, ...command });
    await this.clientRepository.save(client);
  }
}
