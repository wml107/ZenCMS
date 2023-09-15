import { IsString } from "class-validator";

export class AddBioProfileSiteDto{
    @IsString()
    bioContent: string
}