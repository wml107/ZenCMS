"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_module_1 = require("./post.module/post.module");
const validate_pipe_1 = require("./pipes/validate.pipe");
const core_1 = require("@nestjs/core");
const resource_module_1 = require("./resource.module/resource.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const structure_module_1 = require("./structure.module/structure.module");
const package_json_1 = __importDefault(require("../package.json"));
const site_module_1 = require("./site.module/site.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users.module/users.module");
const jwtAuth_gard_1 = require("./auth/jwtAuth.gard");
const user_entities_1 = require("./users.module/entities/user.entities");
const role_entities_1 = require("./users.module/entities/role.entities");
const post_entities_1 = require("./post.module/entities/post.entities");
const refreshToken_interceptor_1 = require("./interceptor/refreshToken.interceptor");
const logRequest_interceptor_1 = require("./interceptor/logRequest.interceptor");
const ReqLog_entities_1 = require("./log.module/entities/ReqLog.entities");
const log_module_1 = require("./log.module/log.module");
const logError_filter_1 = require("./filter/logError.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: package_json_1.default.dataPath + '/db.sql',
                entities: [user_entities_1.User, role_entities_1.Role, post_entities_1.Post, ReqLog_entities_1.ReqLog],
                autoLoadEntities: true,
                synchronize: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'data/resource'),
                serveRoot: '/resource',
                exclude: [
                    'content',
                    'htmlPlugin',
                ]
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            resource_module_1.ResourceModule,
            structure_module_1.StructureModule,
            site_module_1.SiteModule,
            post_module_1.PostModule,
            log_module_1.LogModule
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwtAuth_gard_1.JwtAuthGard
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validate_pipe_1.ValidationPipe
            }, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: refreshToken_interceptor_1.RefreshTokenInterceptor
            }, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logRequest_interceptor_1.LogRequestInterceptor
            }, {
                provide: core_1.APP_FILTER,
                useClass: logError_filter_1.LogErrorFilter
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map