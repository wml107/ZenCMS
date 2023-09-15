"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const log_service_1 = require("../log.module/log.service");
const request_ip_1 = __importDefault(require("request-ip"));
let LogErrorFilter = class LogErrorFilter extends core_1.BaseExceptionFilter {
    constructor(logService) {
        super();
        this.logService = logService;
    }
    catch(exception, host) {
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
        reqLog['ip'] = request_ip_1.default.getClientIp(req);
        reqLog['res']['name'] = exception.name;
        reqLog['res']['message'] = exception.message;
        for (let k of Object.keys(exception))
            reqLog['res'][k] = exception[k];
        this.logService.logReq(reqLog);
        super.catch(exception, host);
    }
};
exports.LogErrorFilter = LogErrorFilter;
exports.LogErrorFilter = LogErrorFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogErrorFilter);
//# sourceMappingURL=logError.filter.js.map