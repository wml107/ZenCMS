import { IsNotEmpty, IsString } from "class-validator";

export class DelFooterSiteDto{
    @IsString()
    @IsNotEmpty()
    footerName: string
}