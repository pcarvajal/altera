import { Module } from '@nestjs/common';
import { ChargeController } from './controllers/charge.controller';

@Module({
  controllers: [ChargeController]
})
export class HttpServerModule {}
