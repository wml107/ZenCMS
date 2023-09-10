import { IsString } from "class-validator";

export class FaviconPageSiteDto{
    @IsString()
    faviconPath: string
}