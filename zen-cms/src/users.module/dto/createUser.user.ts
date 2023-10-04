import { IsDefined, IsInt, IsNotEmpty, IsString, Min, NotEquals } from "class-validator";

export class CreateUserUserDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsDefined()
    password: string

    @IsInt()
    @IsNotEmpty()
    @NotEquals(0)
    @Min(1)
    role: number
}