import { IsInt, Min } from "class-validator";

export class SwapTagsStructureDto{
    @IsInt()
    @Min(0)
    index1: number

    @IsInt()
    @Min(0)
    index2: number
}