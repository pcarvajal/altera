import { Uuid } from './Uuid';

export class PaymentId extends Uuid {
  constructor({ value }: { value: string }) {
    super({ value });
  }
}
