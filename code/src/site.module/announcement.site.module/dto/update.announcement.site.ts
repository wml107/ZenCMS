import { IsString } from "class-validator";

export class UpdateAnnouncementSiteDto{
    @IsString()
    content: string;
}