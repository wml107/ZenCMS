import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordUserDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    oldPassword: string

    @IsString()
    newPassword: string
}