import { IsString } from "class-validator";

export class UpdateAvatarProfileSiteDto{
    @IsString()
    avatarPath: string
}