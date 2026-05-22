import { DynamicModule, Module, Type } from '@nestjs/common';
import { ChargeRepository } from './domain/ports/outputs/ChargeRepository';

export type CoreModuleOptions = {
  modules: Type[];
  adapters: {
    chargeRepository: Type<ChargeRepository>;
  };
};

export const CHARGE_APPLICATION = 'CHARGE_APPLICATION';
export const CHARGE_SERVICE = 'CHARGE_SERVICE';

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    const ChargeServiceProvider = {
      provide: CHARGE_SERVICE,
      useFactory: (chargeRepository: ChargeRepository) => {
        const {
          ChargeApplicationService
        } = require('./application/services/ChargeCreatorApplicationService');
        return new ChargeApplicationService(chargeRepository);
      },
      inject: [options.adapters.chargeRepository]
    };

    return {
      module: CoreModule,
      global: true,
      imports: options.modules,
      providers: [ChargeServiceProvider],
      exports: [CHARGE_APPLICATION]
    };
  }
}
