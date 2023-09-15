import { IsString } from "class-validator";

export class UpdateDataPathSiteDto{
    @IsString()
    dataPath: string
}