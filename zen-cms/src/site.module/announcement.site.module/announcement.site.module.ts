import { Module } from "@nestjs/common";
import { AnnouncementSiteController } from "./announcement.site.controller";
import { SiteService } from "../site.service";
import { AnnouncementSiteService } from "./announcement.site.service";

@Module({
    imports: [],
    controllers: [
        AnnouncementSiteController
    ],
    providers: [
        SiteService,
        AnnouncementSiteService
    ]
})

export class AnnouncementSiteModule { }