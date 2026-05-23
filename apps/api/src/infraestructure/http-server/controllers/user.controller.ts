import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { USER_APPLICATION } from '../../../core/core.module';
import { UserApplication } from '../../../core/application/user/UserApplication';
import { CreateUserRequest } from '../model/create.user.request';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(@Inject(USER_APPLICATION) private readonly userApplication: UserApplication) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateUserRequest): Promise<void> {
    await this.userApplication.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role
    });
  }
}
