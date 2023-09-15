import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LogService } from "src/log.module/log.service";
export declare class LogErrorFilter extends BaseExceptionFilter {
    private logService;
    constructor(logService: LogService);
    catch(exception: any, host: ArgumentsHost): void;
}
