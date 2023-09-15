import { UpdateAnnouncementSiteDto } from "./dto/update.announcement.site";
import { AnnouncementSiteService } from "./announcement.site.service";
export declare class AnnouncementSiteController {
    private announcementSiteService;
    constructor(announcementSiteService: AnnouncementSiteService);
    update(updateAnnouncementSiteDto: UpdateAnnouncementSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
}
