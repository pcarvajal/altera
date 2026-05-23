import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargeRepositoryAdapter } from '../adapters/charge.repository.adapter';
import { DatabaseConfig } from '../config/database.config';
import { ChargeEntity } from './charge.entity';
import { ClientEntity } from './client.entity';
import { UserEntity } from './user.entity';
import { UserRepositoryAdapter } from '../adapters/user.repository.adapter';
import { ClientRepositoryAdapter } from '../adapters/client.repository.adapter';

@Module({
  imports: [
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
          entities: [ChargeEntity, UserEntity, ClientEntity],
          synchronize: true,
          logging: ['query']
        };
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([ChargeEntity, UserEntity, ClientEntity])
  ],
  providers: [ChargeRepositoryAdapter, ClientRepositoryAdapter, UserRepositoryAdapter],
  exports: [ChargeRepositoryAdapter, ClientRepositoryAdapter, UserRepositoryAdapter]
})
export class DatabaseModule {}
