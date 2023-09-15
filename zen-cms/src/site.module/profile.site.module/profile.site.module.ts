import { Module } from "@nestjs/common";
import { SiteService } from "../site.service";
import { ProfileSiteController } from "./profile.site.controller";
import { ProfileSiteService } from "./profile.site.service";

@Module({
    imports: [],
    controllers: [
        ProfileSiteController
    ],
    providers: [
        SiteService,
        ProfileSiteService
    ]
})

export class ProfileSiteModule { }