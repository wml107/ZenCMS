import { IsNotEmpty, IsString, NotEquals } from "class-validator";

export class CreateUserUserDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @NotEquals("super")
    role: string
}