import { IsNotEmpty, IsString } from "class-validator";

export class AddFooterSiteDto{
    @IsString()
    @IsNotEmpty()
    footerName: string

    @IsString()
    @IsNotEmpty()
    routerPath: string
}