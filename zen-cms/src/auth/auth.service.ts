import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/users.module/entities/role.entities';
import { User } from 'src/users.module/entities/user.entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs'; 

@Injectable()
export class AuthService {
    constructor( 
        private readonly jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.usersRepository
            .createQueryBuilder('User')
            .where("User.username = :username", { username: username })
            .getOne();
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            const temp = await this.getUser(result.id);
            const temp2 = await this.getRole(temp.role);
            let userInfo = {
                id: temp.id,
                username: temp.username,
                role: temp.role,
                rolename: temp.role === 0 ? 'super' : (temp2 !== false ? temp2.rolename : false),
                claims: temp.role === 0 ? [] : (temp2 !== false ? temp2.claims : false)
            }
            return userInfo;
        }
        return null;
    }

    generateToken(user) {
        const payload = Object.assign(user, {
            signDate: Date.now()+3000
        });
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    //从token里解析出来的payload不见得都是最新的用户信息，所有有时候还要接着id去数据库查一下
    async getUser(id: number) {
        const user = await this.usersRepository
            .createQueryBuilder('User')
            .where('User.id = :id', { id: id })
            .getOne();
        return user;
    }

    async getRole(roleid: number) {
        const role = await this.rolesRepository
            .createQueryBuilder('Role')
            .where('Role.id = :id', { id: roleid })
            .getOne();
        if (role === null) return false;
        return role;
    } 

    async isExpire(id: number, signDate: number) {
        const expire = (await this.usersRepository
            .createQueryBuilder('User')
            .where('User.id = :id', { id: id })
            .select(["User.expire"])
            .getOne()).expire;
        if (signDate < expire) return true;
        return false;
    }
}
