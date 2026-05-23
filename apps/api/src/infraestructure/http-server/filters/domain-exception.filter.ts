import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from 'shared';
import { InvalidCredentialsError } from '../../../core/domain/user/errors/InvalidCredentialsError';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof InvalidCredentialsError
        ? HttpStatus.UNAUTHORIZED
        : HttpStatus.BAD_REQUEST;
    response.status(status).json(exception.toPrimitives());
  }
}
