import { Module } from "@nestjs/common";
import { SiteService } from "./site.service";
import { AnnouncementSiteModule } from "./announcement.site.module/announcement.site.module";
import { ProfileSiteModule } from "./profile.site.module/profile.site.module";
import { FooterSiteModule } from "./footer.site.module/footer.site.module";
import { PageSiteModule } from "./page.site.module/page.site.module";
import { SiteController } from "./site.controller";

@Module({
    imports: [
        AnnouncementSiteModule,
        ProfileSiteModule,
        FooterSiteModule,
        PageSiteModule
    ],
    controllers: [
        SiteController
    ],
    providers: [
        SiteService,
    ]
})

export class SiteModule { }