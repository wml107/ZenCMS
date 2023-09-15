import { IsString } from "class-validator";

export class ImportResourceDto{
    @IsString()
    targetPath: string
}