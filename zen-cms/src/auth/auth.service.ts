import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/users.module/entities/role.entities';
import { User } from 'src/users.module/entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

    async getRole(id: number) {
        const role = (await this.usersRepository
            .createQueryBuilder('User')
            .where('User.del = 0')
            .andWhere('User.id = :id', { id: id })
            .select(["User.role"])
            .getOne()).role;
        return role;
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
        if (signDate > expire) return false;
        return true;
    }
}
