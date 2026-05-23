import { DynamicModule, Module, Type } from '@nestjs/common';
import { ChargeRepository } from './domain/charge/ports/outputs/ChargeRepository';
import { ClientFinder } from './domain/charge/ports/outputs/ClientFinder';
import { ChargeApplicationService } from './application/charge/services/ChargeCreatorApplicationService';
import { ClientRepository } from './domain/client/ports/outputs/ClientRepository';
import { UserRepository } from './domain/user/ports/outputs/UserRepository';
import { ClientApplicationService } from './application/client/services/ClientCreatorApplicationService';
import { UserApplicationService } from './application/user/services/UserCreatorApplicationService';
import { TokenPort } from './domain/user/ports/outputs/TokenPort';
import { AuthApplicationService } from './application/auth/services/AuthApplicationService';

export type CoreModuleOptions = {
  modules: Type[];
  adapters: {
    chargeRepository: Type<ChargeRepository>;
    clientFinder: Type<ClientFinder>;
    clientRepository: Type<ClientRepository>;
    userRepository: Type<UserRepository>;
    tokenPort: Type<TokenPort>;
  };
};

export const AUTH_APPLICATION = 'AUTH_APPLICATION';
export const CHARGE_APPLICATION = 'CHARGE_APPLICATION';
export const CLIENT_APPLICATION = 'CLIENT_APPLICATION';
export const USER_APPLICATION = 'USER_APPLICATION';

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    const AuthApplicationProvider = {
      provide: AUTH_APPLICATION,
      useFactory: (userRepo: UserRepository, tokenPort: TokenPort) =>
        new AuthApplicationService(userRepo, tokenPort),
      inject: [options.adapters.userRepository, options.adapters.tokenPort]
    };

    const ChargeApplicationProvider = {
      provide: CHARGE_APPLICATION,
      useFactory: (repo: ChargeRepository, clientFinder: ClientFinder) =>
        new ChargeApplicationService(repo, clientFinder),
      inject: [options.adapters.chargeRepository, options.adapters.clientFinder]
    };

    const ClientApplicationProvider = {
      provide: CLIENT_APPLICATION,
      useFactory: (repo: ClientRepository) => new ClientApplicationService(repo),
      inject: [options.adapters.clientRepository]
    };

    const UserApplicationProvider = {
      provide: USER_APPLICATION,
      useFactory: (repo: UserRepository) => new UserApplicationService(repo),
      inject: [options.adapters.userRepository]
    };

    return {
      module: CoreModule,
      global: true,
      imports: options.modules,
      providers: [
        AuthApplicationProvider,
        ChargeApplicationProvider,
        ClientApplicationProvider,
        UserApplicationProvider
      ],
      exports: [AUTH_APPLICATION, CHARGE_APPLICATION, CLIENT_APPLICATION, USER_APPLICATION]
    };
  }
}
