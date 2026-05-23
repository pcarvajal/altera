import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { CLIENT_APPLICATION } from '../../../core/core.module';
import { ClientApplication } from '../../../core/application/client/ClientApplication';
import { CreateClientRequest } from '../model/create.client.request';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../../core/domain/user/enums/Role';

@Controller('clients')
@ApiBearerAuth()
export class ClientController {
  constructor(@Inject(CLIENT_APPLICATION) private readonly clientApplication: ClientApplication) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  async create(@Body() body: CreateClientRequest): Promise<void> {
    await this.clientApplication.createClient({
      name: body.name
    });
  }
}
