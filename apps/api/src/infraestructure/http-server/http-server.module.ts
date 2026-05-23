import { Module } from '@nestjs/common';
import { ChargeController } from './controllers/charge.controller';
import { UserController } from './controllers/user.controller';
import { ClientController } from './controllers/client.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController, ChargeController, ClientController, UserController]
})
export class HttpServerModule {}
