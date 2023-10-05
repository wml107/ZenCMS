import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, Min, NotEquals } from "class-validator"

export class UpdateUserUserDto{
    @IsString()
    @IsNotEmpty()
    oldUsername: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string

    @IsString()
    @IsDefined()
    @IsOptional()
    password: string

    @IsInt()
    @NotEquals(0)
    @Min(1)
    @IsOptional()
    role: number
}