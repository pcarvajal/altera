import { Uuid } from './Uuid';

export class UserId extends Uuid {
  constructor({ value }: { value: string }) {
    super({ value });
  }
}
