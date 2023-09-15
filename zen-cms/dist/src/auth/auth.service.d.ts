import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users.module/entities/role.entities';
import { User } from 'src/users.module/entities/user.entities';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly jwtService;
    private usersRepository;
    private rolesRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<User>, rolesRepository: Repository<Role>);
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        role: string;
        expire: number;
        del: number;
    }>;
    generateToken(user: any): {
        access_token: string;
    };
    getRole(id: number): Promise<string>;
    getClaims(rolename: string): Promise<false | string[]>;
    isExpire(id: number, signDate: number): Promise<boolean>;
}
