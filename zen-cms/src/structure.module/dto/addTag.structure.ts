import { IsNotEmpty, IsString } from "class-validator";

export class AddTagStructureDto{
    @IsString()
    @IsNotEmpty()
    tagName: string
}