import { Uuid } from './Uuid';

export class ClientId extends Uuid {
  constructor({ value }: { value: string }) {
    super({ value });
  }
}
