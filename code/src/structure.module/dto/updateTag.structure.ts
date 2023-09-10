import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTagStructureDto{
    @IsString()
    @IsNotEmpty()
    oldTagName: string

    @IsString()
    @IsNotEmpty()
    newTagName: string
}