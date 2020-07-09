import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const args = context.getArgs()[0];

		const argsToLog = {
			headers: JSON.stringify(args.headers, null, 2),
			url: args.url,
			method: args.method,
			params: JSON.stringify(args.params, null, 2),
			query: JSON.stringify(args.query, null, 2),
			body: JSON.stringify(args.body, null, 2),
		};

		const startTime = Date.now();

		return next.handle().pipe(
			tap((res: any): void => {
				const endTime = Date.now();

				// TODO: LOG
			}),
			catchError(error => {
				const endTime = Date.now();
				// TODO: LOG

				return throwError(error);
			})
		);
	}
}
