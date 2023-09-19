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
            .where("User.del = 0")
            .andWhere("User.username = :username", { username: username })
            .getOne();
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            const temp = await this.getUser(result.id);
            let userInfo = {
                id: temp.id,
                username: temp.username,
                role: temp.role,
                claims: temp.role === 'super' ? [] : await this.getClaims(temp.role)
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
            .where('User.del = 0')
            .andWhere('User.id = :id', { id: id })
            .getOne();
        return user;
    }

    async getClaims(rolename: string) {
        const claims = await this.rolesRepository
            .createQueryBuilder('Role')
            .where('Role.del = 0')
            .andWhere('Role.rolename = :rolename', { rolename: rolename })
            .select(["Role.claims"])
            .getOne();
        if (claims === null) return false;
        return claims.claims;
    }

    async isExpire(id: number, signDate: number) {
        const expire = (await this.usersRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.id = :id', { id: id })
            .select(["User.expire"])
            .getOne()).expire;
        if (signDate < expire) return true;
        return false;
    }
}
