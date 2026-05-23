import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Charge } from '../../core/domain/charge/Charge';
import { ChargeEntity } from '../database/charge.entity';
import { ChargeRepository } from '../../core/domain/charge/ports/outputs/ChargeRepository';
import { ChargeId, ClientId, Nullable } from 'shared';

@Injectable()
export class ChargeRepositoryAdapter implements ChargeRepository {
  constructor(
    @InjectRepository(ChargeEntity)
    private readonly repository: Repository<ChargeEntity>
  ) {}

  async save(charge: Charge): Promise<Charge> {
    const scalars = charge.toScalars();
    await this.repository.save(scalars);
    return charge;
  }

  async findById(chargeId: ChargeId): Promise<Nullable<Charge>> {
    const entity = await this.repository.findOne({ where: { id: chargeId.value } });
    return entity ? Charge.fromScalars(entity) : null;
  }

  async findAll(): Promise<Charge[]> {
    const entities = await this.repository.find();
    return entities.map(Charge.fromScalars);
  }

  async findByClientId(clientId: ClientId): Promise<Charge[]> {
    const entities = await this.repository.find({ where: { clientId: clientId.value } });
    return entities.map(Charge.fromScalars);
  }

  async find(
    page: number,
    pageSize: number,
    state?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Charge[]> {
    const query = this.repository.createQueryBuilder('charge');

    if (state) {
      query.andWhere('charge.state = :state', { state });
    }

    if (fromDate) {
      query.andWhere('charge.createdAt >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('charge.createdAt <= :toDate', { toDate });
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    const entities = await query.getMany();
    return entities.map(Charge.fromScalars);
  }
}
