import { DynamicModule, Module, Type } from '@nestjs/common';
import { ChargeRepository } from './domain/charge/ports/outputs/ChargeRepository';
import { ChargeDomainService } from './domain/charge/services/ChargeDomainService';
import { ChargeApplicationService } from './application/charge/services/ChargeCreatorApplicationService';
import { ClientRepository } from './domain/client/ports/outputs/ClientRepository';
import { UserRepository } from './domain/user/ports/outputs/UserRepository';

import { UserDomainService } from './domain/user/services/UserDomainService';
import { ClientDomainService } from './domain/client/services/ClientDomainService';
import { ClientApplicationService } from './application/client/services/ClientCreatorApplicationService';
import { UserApplicationService } from './application/user/services/UserCreatorApplicationService';
import { TokenPort } from './domain/user/ports/outputs/TokenPort';
import { AuthApplicationService } from './application/auth/services/AuthApplicationService';

export type CoreModuleOptions = {
  modules: Type[];
  adapters: {
    chargeRepository: Type<ChargeRepository>;
    clientRepository: Type<ClientRepository>;
    userRepository: Type<UserRepository>;
    tokenPort: Type<TokenPort>;
  };
};

export const AUTH_APPLICATION = 'AUTH_APPLICATION';

export const CHARGE_APPLICATION = 'CHARGE_APPLICATION';
export const CHARGE_SERVICE = 'CHARGE_SERVICE';

export const CLIENT_APPLICATION = 'CLIENT_APPLICATION';
export const CLIENT_SERVICE = 'CLIENT_SERVICE';

export const USER_APPLICATION = 'USER_APPLICATION';
export const USER_SERVICE = 'USER_SERVICE';

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    // Auth
    const AuthApplicationProvider = {
      provide: AUTH_APPLICATION,
      useFactory: (userRepo: UserRepository, tokenPort: TokenPort) =>
        new AuthApplicationService(userRepo, tokenPort),
      inject: [options.adapters.userRepository, options.adapters.tokenPort]
    };

    // Charge
    const ChargeDomainServiceProvider = {
      provide: CHARGE_SERVICE,
      useFactory: (repo: ChargeRepository) => new ChargeDomainService(repo),
      inject: [options.adapters.chargeRepository]
    };

    const ChargeApplicationProvider = {
      provide: CHARGE_APPLICATION,
      useFactory: (domainService: ChargeDomainService) =>
        new ChargeApplicationService(domainService),
      inject: [CHARGE_SERVICE]
    };

    // Client
    const ClientDomainServiceProvider = {
      provide: CLIENT_SERVICE,
      useFactory: (repo: ClientRepository) => new ClientDomainService(repo),
      inject: [options.adapters.clientRepository]
    };

    const ClientApplicationProvider = {
      provide: CLIENT_APPLICATION,
      useFactory: (domainService: ClientDomainService) =>
        new ClientApplicationService(domainService),
      inject: [CLIENT_SERVICE]
    };

    // User
    const UserDomainServiceProvider = {
      provide: USER_SERVICE,
      useFactory: (repo: UserRepository) => new UserDomainService(repo),
      inject: [options.adapters.userRepository]
    };

    const UserApplicationProvider = {
      provide: USER_APPLICATION,
      useFactory: (domainService: UserDomainService) => new UserApplicationService(domainService),
      inject: [USER_SERVICE]
    };

    const providers = [
      AuthApplicationProvider,
      ChargeDomainServiceProvider,
      ChargeApplicationProvider,
      ClientDomainServiceProvider,
      ClientApplicationProvider,
      UserDomainServiceProvider,
      UserApplicationProvider
    ];

    return {
      module: CoreModule,
      global: true,
      imports: options.modules,
      providers,
      exports: [AUTH_APPLICATION, CHARGE_APPLICATION, CLIENT_APPLICATION, USER_APPLICATION]
    };
  }
}
