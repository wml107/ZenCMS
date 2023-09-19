import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordUserDto{
    @IsString()
    newPassword: string
}