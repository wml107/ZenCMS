import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordUserDto{
    @IsString()
    @IsNotEmpty()
    newPassword: string
}