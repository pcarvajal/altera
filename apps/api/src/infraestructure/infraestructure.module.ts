import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ChargeRepositoryAdapter } from './adapters/charge.repository.adapter';
import { DatabaseModule } from './database/database.module';
import { HttpServerModule } from './http-server/http-server.module';
import { UserRepositoryAdapter } from './adapters/user.repository.adapter';
import { ClientRepositoryAdapter } from './adapters/client.repository.adapter';
import { JwtTokenAdapter } from './adapters/jwt-token.adapter';

@Module({
  imports: [
    CoreModule.register({
      modules: [DatabaseModule],
      adapters: {
        chargeRepository: ChargeRepositoryAdapter,
        clientRepository: ClientRepositoryAdapter,
        userRepository: UserRepositoryAdapter,
        tokenPort: JwtTokenAdapter
      }
    }),
    HttpServerModule
  ]
})
export class InfraestructureModule {}
