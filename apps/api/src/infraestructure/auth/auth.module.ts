import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtTokenAdapter } from '../adapters/jwt-token.adapter';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('jwt.secret'),

        signOptions: { expiresIn: config.get('jwt.expiresIn', '24h') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [JwtTokenAdapter],
  exports: [JwtTokenAdapter]
})
export class AuthInfraestructureModule {}
