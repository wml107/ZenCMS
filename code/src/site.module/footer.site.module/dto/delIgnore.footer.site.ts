import { IsInt, Min } from "class-validator";

export class DelIgnoreFooterSiteDto{
    @IsInt()
    @Min(0)
    index: number
}