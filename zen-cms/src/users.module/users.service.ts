import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePasswordUserDto } from './dto/updatePassword.user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createConnection, getConnection } from 'typeorm';
import { User } from './entities/user.entities';
import { Role } from './entities/role.entities';
import { CreateRoleUserDto } from './dto/createRole.user';
import { UpdateRoleUserDto } from './dto/updateRole.user';
import { DelRoleUserDto } from './dto/delRole.user';
import { CreateUserUserDto } from './dto/createUser.user';
import { UpdateUserUserDto } from './dto/updateUser.user';
import { DelUserUserDto } from './dto/delUser.user';
import bcrypt from 'bcryptjs';
import pkgJson from '../../package.json'
import { ResponseCode, generateResponse } from 'src/utils/Response';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {
        UsersService.initRoot(this.userRepository);
        createConnection({
            type: 'sqlite',
            database: pkgJson.dataPath + '/db.sql',
            entities: [User],
        });
    }

    private static async initRoot(userRepository: Repository<User>) {
        //检查或初始化根用户
        const hasRoot = await userRepository.createQueryBuilder("User").getMany();
        if (hasRoot.length === 0) {
            const rootUsername = require('readline-sync').question("初始化超级管理员用户名：");
            const rootPassword = require('readline-sync').question("初始化超级管理员密码：");
            await userRepository.insert({
                username: rootUsername,
                password: await bcrypt.hash(rootPassword, 10),
                role: "super"
            });
        }
    }

    async updatePassword(updatePasswordUserDto: UpdatePasswordUserDto) {
        const res = await this.userRepository.update({
            username: updatePasswordUserDto.username
        }, {
            password: await bcrypt.hash(updatePasswordUserDto.newPassword, 10),
            expire: Date.now()
        });
        return generateResponse(ResponseCode.OK, "", null);
    }

    async expire(username: string) {
        const res = await this.userRepository.update({
            username: username
        }, {
            expire: Date.now()
        });
        return generateResponse(ResponseCode.OK, "", null);
    }

    async listRole() {
        const res = await this.roleRepository
            .createQueryBuilder('Role')
            .where('Role.del = 0')
            .getMany();

        return generateResponse(ResponseCode.OK, "", res);
    }

    async createRole(createRoleUserDto: CreateRoleUserDto) {
        try {
            await this.roleRepository.insert({
                rolename: createRoleUserDto.rolename,
                claims: createRoleUserDto.claims
            });
        } catch (err) {
            switch (err.errno) {
                case 19:
                    throw new HttpException("name already exists", ResponseCode.EXISTED_NAME_FAIL);
            }
        }
        return generateResponse(ResponseCode.OK, "", null);
    }

    async updateRole(updateRoleUserDto: UpdateRoleUserDto) {
        let updateObj = {};
        for (let k of Object.keys(updateRoleUserDto)) {
            if (k !== "oldRolename") updateObj[k] = updateRoleUserDto[k];
        }
        await this.roleRepository.update(
            { rolename: updateRoleUserDto.oldRolename },
            updateObj
        );
        return generateResponse(ResponseCode.OK, "", null);
    }

    async delRole(delRoleUserDto: DelRoleUserDto) {
        //删角色要确保角色没有被用户引用
        const quote = await this.userRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.role = :role', { role: delRoleUserDto.rolename })
            .getMany();
        if (quote.length > 0) throw new HttpException("role is being referenced", ResponseCode.REFERENCED);

        await this.roleRepository.delete({
            rolename: delRoleUserDto.rolename
        });

        return generateResponse(ResponseCode.OK, "", null)
    }

    async listUser() {
        const res = await this.userRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .getMany();

        return generateResponse(ResponseCode.OK, "", res);
    }

    //需要确保不污染super权限以及超管/根用户，对于创建、修改用户的操作，在参数校验上杜绝super权限扩散；对于删除用户操作，要防止根用户被删除。
    //update操作除了防止super权限扩散，还要防止根用户被篡改，要拦截修改根用户权限的行为。
    async createUser(createUserUserDto: CreateUserUserDto) {
        try {
            await this.userRepository.insert({
                username: createUserUserDto.username,
                password: await bcrypt.hash(createUserUserDto.password, 10),
                role: createUserUserDto.role
            });
        } catch (err) {
            switch (err.errno) {
                case 19:
                    throw new HttpException("name already exists", ResponseCode.EXISTED_NAME_FAIL);
            }
        }
        return generateResponse(ResponseCode.OK, "", null);
    }

    async updateUser(updateUserUserDto: UpdateUserUserDto) {
        let updateObj = {};
        let isRoleUpdate = false;
        let isPasswordUpdate = false;
        let isUsernameUpdate = false;
        for (let k of Object.keys(updateUserUserDto)) {
            if (k !== "oldUsername") updateObj[k] = updateUserUserDto[k];
            if (k === 'username') isUsernameUpdate = true;
            if (k === "role") isRoleUpdate = true;
            if (k === 'password') {
                isPasswordUpdate = true;
                updateObj['password'] = await bcrypt.hash(updateUserUserDto.password, 10);
            }
        }

        //因为修改用户信息伴随着密码修改后令登录失效这样的级联操作，故封装为事务。
        const queryRunner = getConnection().createQueryRunner();
        queryRunner.connect();
        try {
            //阻止篡改根用户权限
            await queryRunner.startTransaction();
            if (isRoleUpdate) {
                await queryRunner.manager.update(User,
                    await this.userRepository
                        .createQueryBuilder('User')
                        .where('User.del = 0')
                        .andWhere('User.username = :username', { username: updateUserUserDto.oldUsername })
                        .andWhere("User.role != 'super'")
                        .getOne(),
                    updateObj
                );
            } else {
                await queryRunner.manager.update(User,
                    { username: updateUserUserDto.oldUsername },
                    updateObj
                );
            }
            //如果密码修改，要让对应账户的token过期。
            if (isPasswordUpdate) await queryRunner.manager.update(User, { username: isUsernameUpdate ? updateUserUserDto.username : updateUserUserDto.oldUsername }, { expire: Date.now() });

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        }

        return generateResponse(ResponseCode.OK, "", null);
    }

    async delUser(delUserUserDto: DelUserUserDto) {
        await this.userRepository.remove(
            await this.userRepository
                .createQueryBuilder('User')
                .where('User.del = 0')
                .andWhere('User.username = :username', { username: delUserUserDto.username })
                .andWhere("User.role != 'super'")
                .getMany()
        );
        return generateResponse(ResponseCode.OK, "", null);
    }
}