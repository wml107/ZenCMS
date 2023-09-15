import { BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { LogService } from "src/log.module/log.service";
import requestIp from 'request-ip';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
    constructor(private logService: LogService){ }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let reqLog = {
            path: '',
            method: '',
            query: {},
            body: {},
            header: [],
            user: {},
            res: {},
            ip: "",
        };
        return next
            .handle()
            .pipe(
                tap(
                    () => {
                        const req = context.switchToHttp().getRequest();
                        reqLog['path'] = req.route.path;
                        reqLog['method'] = req.method;
                        reqLog['query'] = req.query === undefined ? {} : req.query;
                        reqLog['body'] = req.body === undefined ? {} : req.body;
                        reqLog['header'] = req.rawHeaders === undefined ? [] : req.rawHeaders;
                        reqLog['user'] = req.user === undefined ? {} : req.user;
                        reqLog['ip'] = requestIp.getClientIp(req);
                    }
                ),
                map(
                    data => {
                        reqLog['res'] = data === undefined ? {} : data;
                        this.logService.logReq(reqLog);
                        return data;
                    }
                ),
            );
    }
}