import { IsNotEmpty, IsString } from "class-validator";

export class DelRoleUserDto{
    @IsString()
    @IsNotEmpty()
    rolename: string
}