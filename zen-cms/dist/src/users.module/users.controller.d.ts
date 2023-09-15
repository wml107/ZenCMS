import { AuthService } from "src/auth/auth.service";
import { UpdatePasswordUserDto } from "./dto/updatePassword.user";
import { UsersService } from "./users.service";
import { CreateRoleUserDto } from "./dto/createRole.user";
import { UpdateRoleUserDto } from "./dto/updateRole.user";
import { DelRoleUserDto } from "./dto/delRole.user";
import { CreateUserUserDto } from "./dto/createUser.user";
import { UpdateUserUserDto } from "./dto/updateUser.user";
import { DelUserUserDto } from "./dto/delUser.user";
export declare class UsersController {
    private readonly authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any, res: any): void;
    updatePassword(updatePasswordUserDto: UpdatePasswordUserDto): Promise<string>;
    quit(req: any): Promise<{
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
