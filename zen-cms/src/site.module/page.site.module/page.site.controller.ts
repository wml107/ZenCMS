import { Body, Controller, Put } from "@nestjs/common";
import { PageSiteService } from "./page.site.service";
import { CaptionPageSiteDto } from "./dto/caption.page.site";
import { SubheadingPageSiteDto } from "./dto/subheading.page.site";
import { LogoPathPageSiteDto } from "./dto/logoPath.page.site";
import { FaviconPageSiteDto } from "./dto/favicon.page.site";
import { SiteW } from "src/auth/authorization.decorator";

@Controller('site/page')
export class PageSiteController {
    constructor(private pageSiteService: PageSiteService) { }

    @Put('caption')
    @SiteW()
    caption(@Body() captionPageSiteDto: CaptionPageSiteDto){
        return this.pageSiteService.caption(captionPageSiteDto);
    }

    @Put('subheading')
    @SiteW()
    subheading(@Body() subheadingPageSiteDto: SubheadingPageSiteDto){
        return this.pageSiteService.subheading(subheadingPageSiteDto);
    }

    @Put('logo')
    @SiteW()
    logo(@Body() logoPageSieDto: LogoPathPageSiteDto){
        return this.pageSiteService.logo(logoPageSieDto);
    }

    @Put('favicon')
    @SiteW()
    favicon(@Body() faviconPageSiteDto: FaviconPageSiteDto){
        return this.pageSiteService.favicon(faviconPageSiteDto);
    }
}