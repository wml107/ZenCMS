import { IsNotEmpty, IsString } from "class-validator";

export class CutResourceDto{
    @IsString()
    @IsNotEmpty()
    oldPath: string

    @IsString()
    @IsNotEmpty()
    newPath: string
}