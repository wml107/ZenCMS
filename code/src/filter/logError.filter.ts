import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LogService } from "src/log.module/log.service";
import requestIp from 'request-ip';

@Catch()
export class LogErrorFilter extends BaseExceptionFilter {
    constructor(private logService: LogService){
        super();
    }
    
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        let reqLog = {
            path: '',
            method: '',
            query: {},
            body: {},
            header: [],
            user: {},
            res: {},
            error: true,
            ip: ""
        };
        reqLog['path'] = req.url;
        reqLog['method'] = req.method;
        reqLog['query'] = req.query === undefined ? {} : req.query;
        reqLog['body'] = req.body === undefined ? {} : req.body;
        reqLog['header'] = req.rawHeaders === undefined ? [] : req.rawHeaders;
        reqLog['user'] = req.user === undefined ? {} : req.user;
        reqLog['ip'] = requestIp.getClientIp(req);
        reqLog['res']['name'] = exception.name;
        reqLog['res']['message'] = exception.message;
        for(let k of Object.keys(exception)) reqLog['res'][k] = exception[k];
        this.logService.logReq(reqLog);
        super.catch(exception,host);
    }
}