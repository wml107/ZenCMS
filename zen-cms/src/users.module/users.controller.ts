import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { Public, UserR, UserW } from "src/auth/authorization.decorator"; 
import { UpdatePasswordUserDto } from "./dto/updatePassword.user";
import { UsersService } from "./users.service";
import { CreateRoleUserDto } from "./dto/createRole.user";
import { UpdateRoleUserDto } from "./dto/updateRole.user";
import { DelRoleUserDto } from "./dto/delRole.user";
import { CreateUserUserDto } from "./dto/createUser.user";
import { UpdateUserUserDto } from "./dto/updateUser.user";
import { DelUserUserDto } from "./dto/delUser.user";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Controller("user")
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post("login")
    @Public()
    @UseGuards(AuthGuard('local'))
    login(@Request() req, @Response() res) {
        this.usersService.expire(req.user.id);
        res.send(generateResponse(ResponseCode.OK, "", req.user));
    }

    @Get("autoLogin")
    autoLogin(@Request() req, @Response() res){
        res.send(generateResponse(ResponseCode.OK, "", req.user));
    }

    @Post('updatePassword')
    async updatePassword(@Body() updatePasswordUserDto: UpdatePasswordUserDto){
        if(this.authService.validateUser(updatePasswordUserDto.username, updatePasswordUserDto.oldPassword)){
            this.usersService.updatePassword(updatePasswordUserDto);
            return 'succ';
        }else{
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @Get('quit')
    async quit(@Request() req){
        this.usersService.expire(req.user.id);
        return generateResponse(ResponseCode.OK, "", null);
    }

    @Get('listRole')
    @UserR()
    async listRole(){
        return this.usersService.listRole();
    }

    @Post('createRole')
    @UserW()    
    async createRole(@Body() createRoleUserDto: CreateRoleUserDto){
        return this.usersService.createRole(createRoleUserDto);
    }

    @Post('updateRole')
    @UserW()
    async updateRole(@Body() updateRoleUserDto: UpdateRoleUserDto){
        return this.usersService.updateRole(updateRoleUserDto);
    }

    @Post('delRole')
    @UserW()
    async delRole(@Body() delRoleUserDto: DelRoleUserDto){
        return this.usersService.delRole(delRoleUserDto);
    }

    @Get('listUser')
    @UserR()
    async listUser(){
        return this.usersService.listUser();
    }

    @Post('createUser')
    @UserW()
    async createUser(@Body() createUserUserDto: CreateUserUserDto){
        return this.usersService.createUser(createUserUserDto);
    }

    @Post('updateUser')
    @UserW()
    async updateUser(@Body() updateUserUserDto: UpdateUserUserDto){
        return this.usersService.updateUser(updateUserUserDto);
    }

    @Post('delUser')
    @UserW()
    async delUser(@Body() delUserUserDto: DelUserUserDto){
        return this.usersService.delUser(delUserUserDto);
    }
}