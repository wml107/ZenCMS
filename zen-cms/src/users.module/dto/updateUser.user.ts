import { IsInt, IsNotEmpty, IsOptional, IsString, Min, NotEquals } from "class-validator"

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
    @NotEquals(0)
    @IsInt()
    @Min(1)
    @IsOptional()
    role: number
}