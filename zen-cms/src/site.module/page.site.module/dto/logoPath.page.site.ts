import { IsString } from "class-validator";

export class LogoPathPageSiteDto{
    @IsString()
    logoPath: string
}