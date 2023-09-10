import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFooterSiteDto{
    @IsString()
    @IsNotEmpty()
    oldFooterName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    footerName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    routerPath: string
}