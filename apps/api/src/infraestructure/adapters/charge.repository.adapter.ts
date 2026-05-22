import { Injectable } from '@nestjs/common';
import { ChargeRepository } from '../../core/domain/ports/outputs/ChargeRepository';
import { Charge } from '../../core/domain/entities/Charge';

@Injectable()
export class ChargeRepositoryAdapter implements ChargeRepository {
  save(charge: Charge): Promise<Charge> {
    throw new Error('Method not implemented.');
  }
}
