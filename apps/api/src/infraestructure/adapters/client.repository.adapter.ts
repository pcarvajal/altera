import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../database/client.entity';
import { ClientRepository } from '../../core/domain/client/ports/outputs/ClientRepository';
import { Client } from '../../core/domain/client/Client';

@Injectable()
export class ClientRepositoryAdapter implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>
  ) {}

  async save(client: Client): Promise<Client> {
    const scalars = client.toScalars();
    await this.repository.save(scalars);
    return client;
  }
}
