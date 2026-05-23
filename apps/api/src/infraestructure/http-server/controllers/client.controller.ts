import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { CLIENT_APPLICATION } from '../../../core/core.module';
import { ClientApplication } from '../../../core/application/client/ClientApplication';
import { CreateClientRequest } from '../model/create.client.request';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('clients')
export class ClientController {
  constructor(@Inject(CLIENT_APPLICATION) private readonly clientApplication: ClientApplication) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateClientRequest): Promise<void> {
    await this.clientApplication.createClient({
      name: body.name
    });
  }
}
