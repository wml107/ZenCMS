import { IsInt, IsNotEmpty, IsString, Min, NotEquals } from "class-validator";

export class CreateUserUserDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @NotEquals(0)
    @IsInt()
    @Min(1)
    role: number
}