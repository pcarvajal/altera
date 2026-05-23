import { AggregateRoot, ClientId } from 'shared';
import { ClientName } from './value-objects/ClientName';
import { ClientScalar } from './ClientScalar';
import { ClientIdMissingError } from './errors/ClientIdMissingError';

export class Client extends AggregateRoot {
  private id: ClientId;
  private name: ClientName;

  constructor(id: ClientId, name: ClientName) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(scalars: ClientScalar): Client {
    if (!scalars.id) throw new ClientIdMissingError();
    return new Client(new ClientId({ value: scalars.id }), new ClientName({ value: scalars.name }));
  }

  toScalars(): ClientScalar {
    return {
      id: this.id.value,
      name: this.name.value
    };
  }
}
