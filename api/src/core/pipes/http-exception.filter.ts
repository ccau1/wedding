import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus?.() || 500;
    const message = {
      __global:
        (exception?.getResponse?.() as any)?.message || exception.message,
    };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      stack: exception.stack,
      path: request.url,
    });
  }
}
