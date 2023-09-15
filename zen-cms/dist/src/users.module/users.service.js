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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entities_1 = require("./entities/user.entities");
const role_entities_1 = require("./entities/role.entities");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const package_json_1 = __importDefault(require("../../package.json"));
const Response_1 = require("../utils/Response");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        UsersService_1.initRoot(this.userRepository);
        (0, typeorm_2.createConnection)({
            type: 'sqlite',
            database: package_json_1.default.dataPath + '/db.sql',
            entities: [user_entities_1.User],
        });
    }
    static async initRoot(userRepository) {
        const hasRoot = await userRepository.createQueryBuilder("User").getMany();
        if (hasRoot.length === 0) {
            const rootUsername = require('readline-sync').question("初始化超级管理员用户名：");
            const rootPassword = require('readline-sync').question("初始化超级管理员密码：");
            await userRepository.insert({
                username: rootUsername,
                password: await bcryptjs_1.default.hash(rootPassword, 10),
                role: "super"
            });
        }
    }
    async updatePassword(updatePasswordUserDto) {
        const res = await this.userRepository.update({
            username: updatePasswordUserDto.username
        }, {
            password: await bcryptjs_1.default.hash(updatePasswordUserDto.newPassword, 10),
            expire: Date.now()
        });
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async expire(username) {
        const res = await this.userRepository.update({
            username: username
        }, {
            expire: Date.now()
        });
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async listRole() {
        const res = await this.roleRepository
            .createQueryBuilder('Role')
            .where('Role.del = 0')
            .getMany();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", res);
    }
    async createRole(createRoleUserDto) {
        try {
            await this.roleRepository.insert({
                rolename: createRoleUserDto.rolename,
                claims: createRoleUserDto.claims
            });
        }
        catch (err) {
            switch (err.errno) {
                case 19:
                    throw new common_1.HttpException("name already exists", Response_1.ResponseCode.EXISTED_NAME_FAIL);
            }
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async updateRole(updateRoleUserDto) {
        let updateObj = {};
        for (let k of Object.keys(updateRoleUserDto)) {
            if (k !== "oldRolename")
                updateObj[k] = updateRoleUserDto[k];
        }
        await this.roleRepository.update({ rolename: updateRoleUserDto.oldRolename }, updateObj);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async delRole(delRoleUserDto) {
        const quote = await this.userRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.role = :role', { role: delRoleUserDto.rolename })
            .getMany();
        if (quote.length > 0)
            throw new common_1.HttpException("role is being referenced", Response_1.ResponseCode.REFERENCED);
        await this.roleRepository.delete({
            rolename: delRoleUserDto.rolename
        });
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async listUser() {
        const res = await this.userRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .getMany();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", res);
    }
    async createUser(createUserUserDto) {
        try {
            await this.userRepository.insert({
                username: createUserUserDto.username,
                password: await bcryptjs_1.default.hash(createUserUserDto.password, 10),
                role: createUserUserDto.role
            });
        }
        catch (err) {
            switch (err.errno) {
                case 19:
                    throw new common_1.HttpException("name already exists", Response_1.ResponseCode.EXISTED_NAME_FAIL);
            }
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async updateUser(updateUserUserDto) {
        let updateObj = {};
        let isRoleUpdate = false;
        let isPasswordUpdate = false;
        let isUsernameUpdate = false;
        for (let k of Object.keys(updateUserUserDto)) {
            if (k !== "oldUsername")
                updateObj[k] = updateUserUserDto[k];
            if (k === 'username')
                isUsernameUpdate = true;
            if (k === "role")
                isRoleUpdate = true;
            if (k === 'password') {
                isPasswordUpdate = true;
                updateObj['password'] = await bcryptjs_1.default.hash(updateUserUserDto.password, 10);
            }
        }
        const queryRunner = (0, typeorm_2.getConnection)().createQueryRunner();
        queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            if (isRoleUpdate) {
                await queryRunner.manager.update(user_entities_1.User, await this.userRepository
                    .createQueryBuilder('User')
                    .where('User.del = 0')
                    .andWhere('User.username = :username', { username: updateUserUserDto.oldUsername })
                    .andWhere("User.role != 'super'")
                    .getOne(), updateObj);
            }
            else {
                await queryRunner.manager.update(user_entities_1.User, { username: updateUserUserDto.oldUsername }, updateObj);
            }
            if (isPasswordUpdate)
                await queryRunner.manager.update(user_entities_1.User, { username: isUsernameUpdate ? updateUserUserDto.username : updateUserUserDto.oldUsername }, { expire: Date.now() });
            await queryRunner.commitTransaction();
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async delUser(delUserUserDto) {
        await this.userRepository.remove(await this.userRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.username = :username', { username: delUserUserDto.username })
            .andWhere("User.role != 'super'")
            .getMany());
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entities_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map