import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/database.config';
import { ChargeEntity } from './charge.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');

        if (!database) {
          throw new Error('Database configuration not found');
        }
        const { host, name, port, user: username, password } = database;

        return {
          host,
          port,
          password,
          username,
          database: name,
          type: 'postgres',
          entities: [ChargeEntity],
          synchronize: false,
          logging: ['query']
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class ChargeDatabaseModule {}
