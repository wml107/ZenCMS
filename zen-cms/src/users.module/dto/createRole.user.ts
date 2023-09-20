import { IsArray, IsNotEmpty, IsString, NotEquals } from "class-validator";

export class CreateRoleUserDto{
    //这里不校验写权限是否具有读权限作为前置，客户端会有相应的输入限制，并且就算是在客户端以外的地方发起请求，也要先过鉴权这一关，并且这种输入也不会对系统造成影响。
    @IsString()
    @IsNotEmpty()
    @NotEquals("super")
    rolename: string

    @IsArray()
    @IsString({
        each: true
    })
    @IsNotEmpty({
        each: true
    })
    claims: string[]
}