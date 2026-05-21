import { Uuid } from './Uuid';

export class ChargeId extends Uuid {
  constructor({ value }: { value: string }) {
    super({ value });
  }
}
