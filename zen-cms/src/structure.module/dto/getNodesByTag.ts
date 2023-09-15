import { IsNotEmpty, IsString } from "class-validator";

export class GetNodesByTagStructureDto{
    @IsString()
    @IsNotEmpty()
    tagName: string
}