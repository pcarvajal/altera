import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargeRepositoryAdapter } from '../adapters/charge.repository.adapter';
import { DatabaseConfig } from '../config/database.config';
import { ChargeEntity } from './charge.entity';
import { ClientEntity } from './client.entity';
import { UserEntity } from './user.entity';
import { UserRepositoryAdapter } from '../adapters/user.repository.adapter';
import { ClientRepositoryAdapter } from '../adapters/client.repository.adapter';
import { JwtTokenAdapter } from '../adapters/jwt-token.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('jwt.secret'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        signOptions: { expiresIn: config.get('jwt.expiresIn', '24h') as any }
      }),
      inject: [ConfigService]
    }),
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
          entities: [ChargeEntity, UserEntity, ClientEntity],
          synchronize: true,
          logging: ['query']
        };
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([ChargeEntity, UserEntity, ClientEntity])
  ],
  providers: [ChargeRepositoryAdapter, ClientRepositoryAdapter, UserRepositoryAdapter, JwtTokenAdapter],
  exports: [ChargeRepositoryAdapter, ClientRepositoryAdapter, UserRepositoryAdapter, JwtTokenAdapter]
})
export class DatabaseModule {}
