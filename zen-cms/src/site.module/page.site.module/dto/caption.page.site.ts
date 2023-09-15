import { IsString } from "class-validator";

export class CaptionPageSiteDto{
    @IsString()
    caption: string
}