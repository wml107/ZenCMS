import { Module } from "@nestjs/common";
import { FooterSiteController } from "./footer.site.controller";
import { FooterSiteService } from "./footer.site.service";

@Module({
    imports: [],
    controllers: [FooterSiteController],
    providers: [FooterSiteService],
})
export class FooterSiteModule { }