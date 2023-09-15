import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBioProfileSiteDto{
    @IsString()
    @IsNotEmpty()
    oldBio: string

    @IsString()
    @IsNotEmpty()
    newBio: string
}