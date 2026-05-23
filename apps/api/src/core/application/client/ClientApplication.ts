import { ClientScalar } from '../../domain/client/ClientScalar';

export abstract class ClientApplication {
  abstract createClient(input: ClientScalar): Promise<void>;
}
