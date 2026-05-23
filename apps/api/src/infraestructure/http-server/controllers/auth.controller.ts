import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AUTH_APPLICATION } from '../../../core/core.module';
import { AuthApplication } from '../../../core/application/auth/AuthApplication';
import { LoginRequest } from '../model/login.request';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_APPLICATION) private readonly authApplication: AuthApplication) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequest): Promise<{ accessToken: string }> {
    return this.authApplication.login({ email: body.email, password: body.password });
  }
}
