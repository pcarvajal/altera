import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../database/client.entity';
import { ClientRepository } from '../../core/domain/client/ports/outputs/ClientRepository';
import { ClientFinder } from '../../core/domain/charge/ports/outputs/ClientFinder';
import { Client } from '../../core/domain/client/Client';

@Injectable()
export class ClientRepositoryAdapter implements ClientRepository, ClientFinder {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>
  ) {}

  async save(client: Client): Promise<Client> {
    const scalars = client.toScalars();
    await this.repository.save(scalars);
    return client;
  }

  async existsById(clientId: string): Promise<boolean> {
    return this.repository.existsBy({ id: clientId });
  }
}
