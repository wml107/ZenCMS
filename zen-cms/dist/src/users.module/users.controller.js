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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../auth/auth.service");
const authorization_decorator_1 = require("../auth/authorization.decorator");
const updatePassword_user_1 = require("./dto/updatePassword.user");
const users_service_1 = require("./users.service");
const createRole_user_1 = require("./dto/createRole.user");
const updateRole_user_1 = require("./dto/updateRole.user");
const delRole_user_1 = require("./dto/delRole.user");
const createUser_user_1 = require("./dto/createUser.user");
const updateUser_user_1 = require("./dto/updateUser.user");
const delUser_user_1 = require("./dto/delUser.user");
const Response_1 = require("../utils/Response");
let UsersController = class UsersController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    login(req, res) {
        res.send((0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null));
    }
    async updatePassword(updatePasswordUserDto) {
        if (this.authService.validateUser(updatePasswordUserDto.username, updatePasswordUserDto.oldPassword)) {
            this.usersService.updatePassword(updatePasswordUserDto);
            return 'succ';
        }
        else {
            throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async quit(req) {
        return this.usersService.expire(req.user.username);
    }
    async listRole() {
        return this.usersService.listRole();
    }
    async createRole(createRoleUserDto) {
        return this.usersService.createRole(createRoleUserDto);
    }
    async updateRole(updateRoleUserDto) {
        return this.usersService.updateRole(updateRoleUserDto);
    }
    async delRole(delRoleUserDto) {
        return this.usersService.delRole(delRoleUserDto);
    }
    async listUser() {
        return this.usersService.listUser();
    }
    async createUser(createUserUserDto) {
        return this.usersService.createUser(createUserUserDto);
    }
    async updateUser(updateUserUserDto) {
        return this.usersService.updateUser(updateUserUserDto);
    }
    async delUser(delUserUserDto) {
        return this.usersService.delUser(delUserUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("login"),
    (0, authorization_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('updatePassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePassword_user_1.UpdatePasswordUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)('quit'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "quit", null);
__decorate([
    (0, common_1.Get)('listRole'),
    (0, authorization_decorator_1.UserR)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listRole", null);
__decorate([
    (0, common_1.Post)('createRole'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRole_user_1.CreateRoleUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createRole", null);
__decorate([
    (0, common_1.Post)('updateRole'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateRole_user_1.UpdateRoleUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Post)('delRole'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delRole_user_1.DelRoleUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delRole", null);
__decorate([
    (0, common_1.Get)('listUser'),
    (0, authorization_decorator_1.UserR)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listUser", null);
__decorate([
    (0, common_1.Post)('createUser'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_user_1.CreateUserUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('updateUser'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_user_1.UpdateUserUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('delUser'),
    (0, authorization_decorator_1.UserW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delUser_user_1.DelUserUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map