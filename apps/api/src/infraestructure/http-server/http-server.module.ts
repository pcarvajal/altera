import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { ChargeController } from './controllers/charge.controller';
import { ClientController } from './controllers/client.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [PassportModule],
  controllers: [AuthController, ChargeController, ClientController, UserController],
  providers: [JwtStrategy]
})
export class HttpServerModule {}
