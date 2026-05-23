import { CreateClientCommand } from './commands/CreateClientCommand';

export abstract class ClientApplication {
  abstract createClient(command: CreateClientCommand): Promise<void>;
}
