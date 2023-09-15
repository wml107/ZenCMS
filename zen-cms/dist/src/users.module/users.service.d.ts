import { UpdatePasswordUserDto } from './dto/updatePassword.user';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { Role } from './entities/role.entities';
import { CreateRoleUserDto } from './dto/createRole.user';
import { UpdateRoleUserDto } from './dto/updateRole.user';
import { DelRoleUserDto } from './dto/delRole.user';
import { CreateUserUserDto } from './dto/createUser.user';
import { UpdateUserUserDto } from './dto/updateUser.user';
import { DelUserUserDto } from './dto/delUser.user';
export declare class UsersService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    private static initRoot;
    updatePassword(updatePasswordUserDto: UpdatePasswordUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    expire(username: string): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    listRole(): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    createRole(createRoleUserDto: CreateRoleUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    updateRole(updateRoleUserDto: UpdateRoleUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    delRole(delRoleUserDto: DelRoleUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    listUser(): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    createUser(createUserUserDto: CreateUserUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    updateUser(updateUserUserDto: UpdateUserUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    delUser(delUserUserDto: DelUserUserDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
}
