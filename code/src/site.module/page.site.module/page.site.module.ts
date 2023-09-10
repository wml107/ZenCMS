import { Module } from "@nestjs/common";
import { PageSiteController } from "./page.site.controller";
import { PageSiteService } from "./page.site.service";

@Module({
    imports: [],
    controllers: [PageSiteController],
    providers: [PageSiteService],
})
export class PageSiteModule { }