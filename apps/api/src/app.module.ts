import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './infraestructure/config/database.config';
import serverConfig from './infraestructure/config/server.config';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import jwtConfig from './infraestructure/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [databaseConfig, serverConfig, jwtConfig]
    }),
    InfraestructureModule
  ]
})
export class AppModule {}
