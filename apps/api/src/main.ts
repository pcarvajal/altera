import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './infraestructure/http-server/filters/domain-exception.filter';
import { ServerConfig } from './infraestructure/config/server.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function getServerConfig(app: INestApplication): ServerConfig | undefined {
  const config: ConfigService = app.get(ConfigService);
  return config.get<ServerConfig>('server');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DomainExceptionFilter());

  const serverConfig = getServerConfig(app);
  if (!serverConfig) {
    throw new Error('Server configuration not found');
  }

  const OAConfig = new DocumentBuilder()
    .setTitle('Charge API')
    .setDescription('The charge API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = await SwaggerModule.createDocument(app, OAConfig);
  SwaggerModule.setup('api', app, documentFactory, { jsonDocumentUrl: 'swagger/json' });

  await app.listen(serverConfig.port);
}
bootstrap();
