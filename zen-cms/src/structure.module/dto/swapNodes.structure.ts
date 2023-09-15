import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class SwapNodesStructureDto{
    @IsInt()
    @Min(0)
    index1: number

    @IsInt()
    @Min(0)
    index2: number

    @IsString()
    @IsNotEmpty()
    configPath: string
}