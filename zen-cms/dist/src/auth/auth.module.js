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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const package_json_1 = __importDefault(require("../../package.json"));
const typeorm_1 = require("@nestjs/typeorm");
const user_entities_1 = require("../users.module/entities/user.entities");
const jwt_strategy_1 = require("./jwt.strategy");
const jwtAuth_gard_1 = require("./jwtAuth.gard");
const role_entities_1 = require("../users.module/entities/role.entities");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entities_1.User, role_entities_1.Role]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: package_json_1.default.secret,
                signOptions: {
                    expiresIn: '43200s'
                }
            })
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            jwtAuth_gard_1.JwtAuthGard
        ],
        exports: [
            auth_service_1.AuthService,
            jwtAuth_gard_1.JwtAuthGard
        ]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map