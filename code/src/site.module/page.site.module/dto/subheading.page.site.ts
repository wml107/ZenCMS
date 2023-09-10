import { IsString } from "class-validator";

export class SubheadingPageSiteDto{
    @IsString()
    subheading: string
}