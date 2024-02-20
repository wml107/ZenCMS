import { Body, Controller, Put } from "@nestjs/common";
import { UpdateAnnouncementSiteDto } from "./dto/update.announcement.site";
import { AnnouncementSiteService } from "./announcement.site.service";
import { SiteW } from "src/auth/authorization.decorator";

@Controller('site/announcement')
export class AnnouncementSiteController{
    constructor(private announcementSiteService: AnnouncementSiteService){}
    
    @Put('update')
    @SiteW()
    update(@Body() updateAnnouncementSiteDto: UpdateAnnouncementSiteDto){
        return this.announcementSiteService.update(updateAnnouncementSiteDto);
    }
}