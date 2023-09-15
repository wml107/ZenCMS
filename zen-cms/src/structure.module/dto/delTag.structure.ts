import { IsNotEmpty, IsString } from "class-validator";

export class DelTagStructureDto{
    @IsString()
    @IsNotEmpty()
    tagName: string
}