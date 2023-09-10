import { IsNotEmpty, IsString } from "class-validator";

export class CopyResourceDto{
    @IsString()
    @IsNotEmpty()
    oldPath: string

    @IsString()
    @IsNotEmpty()
    newPath: string
}