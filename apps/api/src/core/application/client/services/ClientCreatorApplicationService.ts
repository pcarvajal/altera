import { Uuid } from 'shared';
import { Client } from '../../../domain/client/Client';
import { ClientScalar } from '../../../domain/client/ClientScalar';
import { ClientDomainService } from '../../../domain/client/services/ClientDomainService';
import { ClientApplication } from '../ClientApplication';

export class ClientApplicationService extends ClientApplication {
  constructor(private readonly clientDomainService: ClientDomainService) {
    super();
  }

  async createClient(input: ClientScalar): Promise<void> {
    const client = Client.create({ id: Uuid.random().value, ...input });
    await this.clientDomainService.save(client);
  }
}
