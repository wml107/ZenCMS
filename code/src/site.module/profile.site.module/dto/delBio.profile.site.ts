import { IsNotEmpty, IsString } from "class-validator";

export class DelBioProfileSiteDto{
    @IsString()
    @IsNotEmpty()
    bioContent: string
}