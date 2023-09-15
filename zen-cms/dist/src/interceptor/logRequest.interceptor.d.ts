import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { LogService } from "src/log.module/log.service";
export declare class LogRequestInterceptor implements NestInterceptor {
    private logService;
    constructor(logService: LogService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
