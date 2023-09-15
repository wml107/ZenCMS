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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
let JwtAuthGard = class JwtAuthGard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, authService) {
        super();
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),
        ]);
        const claim = this.reflector.getAllAndOverride("claim", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        let res;
        try {
            res = await super.canActivate(context);
            if (!res)
                return res;
            const { id, signDate } = context.switchToHttp().getRequest().user;
            if (await this.authService.isExpire(id, signDate))
                throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
            const role = await this.authService.getRole(id);
            if (role === 'super' || claim === undefined)
                return true;
            const claims = await this.authService.getClaims(role);
            if (!claims)
                throw new common_1.HttpException("role does not exist", common_1.HttpStatus.FORBIDDEN);
            for (let i = 0; i < claims.length; i++)
                if (claims[i] === claim)
                    return true;
            return false;
        }
        catch (err) {
            if (err.response === "role does not exist")
                throw new common_1.HttpException("role does not exist", common_1.HttpStatus.FORBIDDEN);
            if (err.response === "Unauthorized")
                throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
            throw new common_1.HttpException(err.response.message, err.response.statusCode);
        }
    }
};
exports.JwtAuthGard = JwtAuthGard;
exports.JwtAuthGard = JwtAuthGard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], JwtAuthGard);
//# sourceMappingURL=jwtAuth.gard.js.map