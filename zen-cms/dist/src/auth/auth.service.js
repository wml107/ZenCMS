"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const role_entities_1 = require("../users.module/entities/role.entities");
const user_entities_1 = require("../users.module/entities/user.entities");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
let AuthService = class AuthService {
    constructor(jwtService, usersRepository, rolesRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    async validateUser(username, password) {
        const user = await this.usersRepository
            .createQueryBuilder('User')
            .where("User.del = 0")
            .andWhere("User.username = :username", { username: username })
            .getOne();
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    generateToken(user) {
        const payload = Object.assign(user, {
            signDate: Date.now()
        });
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async getRole(id) {
        const role = (await this.usersRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.id = :id', { id: id })
            .select(["User.role"])
            .getOne()).role;
        return role;
    }
    async getClaims(rolename) {
        const claims = await this.rolesRepository
            .createQueryBuilder('Role')
            .where('Role.del = 0')
            .andWhere('Role.rolename = :rolename', { rolename: rolename })
            .select(["Role.claims"])
            .getOne();
        if (claims === null)
            return false;
        return claims.claims;
    }
    async isExpire(id, signDate) {
        const expire = (await this.usersRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.id = :id', { id: id })
            .select(["User.expire"])
            .getOne()).expire;
        if (signDate > expire)
            return false;
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entities_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entities_1.Role)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map