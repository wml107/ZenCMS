import { IsNotEmpty, IsString } from "class-validator";

export class DelNodeStructureDto{
    @IsString()
    @IsNotEmpty()
    nodeName: string

    @IsString()
    @IsNotEmpty()
    configPath: string
}