import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { ServerConfig } from './infraestructure/config/server.config';
import { AppModule } from './app.module';

function getServerConfig(app: INestApplication): ServerConfig | undefined {
  const config: ConfigService = app.get(ConfigService);
  return config.get<ServerConfig>('server');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = getServerConfig(app);

  if (!serverConfig) {
    throw new Error('Server configuration not found');
  }
  await app.listen(serverConfig.port);
}
bootstrap();
