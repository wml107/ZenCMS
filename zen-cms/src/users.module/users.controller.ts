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
    async login(@Request() req, @Response() res) {
        await this.usersService.expire(req.user.id);
        res.send(generateResponse(ResponseCode.OK, "", req.user));
    }

    @Get("autoLogin")
    autoLogin(@Request() req, @Response() res){
        res.send(generateResponse(ResponseCode.OK, "", req.user));
    }

    @Post('updatePassword')
    async updatePassword(@Body() updatePasswordUserDto: UpdatePasswordUserDto, @Request() req){
        //更新密码的操作顺便刷新了expire参数，所以自动让旧token失效了，所以就不必再调用userService.expire了。
        await this.usersService.updatePassword(updatePasswordUserDto, req.user.id);
        return generateResponse(ResponseCode.OK, "", null)
    }

    @Get('quit')
    async quit(@Request() req){
        await this.usersService.expire(req.user.id);
        return generateResponse(ResponseCode.OK, "", null);
    }

    @Get('listRole')
    @UserR()
    async listRole(){
        const res = await this.usersService.listRole();
        return generateResponse(ResponseCode.OK, "", res);
    }

    @Post('createRole')
    @UserW()    
    async createRole(@Body() createRoleUserDto: CreateRoleUserDto){
        if(await this.usersService.createRole(createRoleUserDto)) return generateResponse(ResponseCode.OK, "", null);
    }

    @Post('updateRole')
    @UserW()
    async updateRole(@Body() updateRoleUserDto: UpdateRoleUserDto){
        if(await this.usersService.updateRole(updateRoleUserDto)) return generateResponse(ResponseCode.OK, "", null);
    }

    @Post('delRole')
    @UserW()
    async delRole(@Body() delRoleUserDto: DelRoleUserDto){
        if(await this.usersService.delRole(delRoleUserDto)) return generateResponse(ResponseCode.OK, "", null);
    }

    @Get('listUser')
    @UserR()
    async listUser(){
        const res = await this.usersService.listUser();
        return generateResponse(ResponseCode.OK, "", res);
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
        if(await this.usersService.delUser(delUserUserDto)) return generateResponse(ResponseCode.OK, "", null);
    }
}