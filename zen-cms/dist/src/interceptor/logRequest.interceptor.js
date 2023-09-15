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
exports.LogRequestInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const log_service_1 = require("../log.module/log.service");
const request_ip_1 = __importDefault(require("request-ip"));
let LogRequestInterceptor = class LogRequestInterceptor {
    constructor(logService) {
        this.logService = logService;
    }
    intercept(context, next) {
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
            .pipe((0, rxjs_1.tap)(() => {
            const req = context.switchToHttp().getRequest();
            reqLog['path'] = req.route.path;
            reqLog['method'] = req.method;
            reqLog['query'] = req.query === undefined ? {} : req.query;
            reqLog['body'] = req.body === undefined ? {} : req.body;
            reqLog['header'] = req.rawHeaders === undefined ? [] : req.rawHeaders;
            reqLog['user'] = req.user === undefined ? {} : req.user;
            reqLog['ip'] = request_ip_1.default.getClientIp(req);
        }), (0, rxjs_1.map)(data => {
            reqLog['res'] = data === undefined ? {} : data;
            this.logService.logReq(reqLog);
            return data;
        }));
    }
};
exports.LogRequestInterceptor = LogRequestInterceptor;
exports.LogRequestInterceptor = LogRequestInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogRequestInterceptor);
//# sourceMappingURL=logRequest.interceptor.js.map