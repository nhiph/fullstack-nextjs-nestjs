import { RESPONSE_MESSAGE } from '@/decorator/customize';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    message?: string;
    data: any;
}

// intercepter to wrap data from any service with message and status code, should config global in app.module.ts
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next
            .handle()
            .pipe(
                map((data) => ({
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: this.reflector
                        .get<string>(RESPONSE_MESSAGE, context.getHandler()) || '',
                    data: data
                })),
            );
    }
}
