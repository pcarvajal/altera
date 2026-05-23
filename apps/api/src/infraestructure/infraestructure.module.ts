import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { DatabaseModule } from './database/database.module';
import { AuthInfraestructureModule } from './auth/auth.module';
import { HttpServerModule } from './http-server/http-server.module';
import { ChargeRepositoryAdapter } from './adapters/charge.repository.adapter';
import { ClientRepositoryAdapter } from './adapters/client.repository.adapter';
import { UserRepositoryAdapter } from './adapters/user.repository.adapter';
import { JwtTokenAdapter } from './adapters/jwt-token.adapter';

@Module({
  imports: [
    CoreModule.register({
      modules: [DatabaseModule, AuthInfraestructureModule],
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
