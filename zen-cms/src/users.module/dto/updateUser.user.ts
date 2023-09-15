import { IsNotEmpty, IsOptional, IsString, NotEquals } from "class-validator"

export class UpdateUserUserDto{
    @IsString()
    @IsNotEmpty()
    oldUsername: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string

    @IsString()
    @IsNotEmpty()
    @NotEquals("super")
    @IsOptional()
    role: string
}