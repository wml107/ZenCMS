import { Body, Controller, Post } from "@nestjs/common";
import { PageSiteService } from "./page.site.service";
import { CaptionPageSiteDto } from "./dto/caption.page.site";
import { SubheadingPageSiteDto } from "./dto/subheading.page.site";
import { LogoPathPageSiteDto } from "./dto/logoPath.page.site";
import { FaviconPageSiteDto } from "./dto/favicon.page.site";
import { SiteW } from "src/auth/authorization.decorator";

@Controller('site/page')
export class PageSiteController {
    constructor(private pageSiteService: PageSiteService) { }

    @Post('caption')
    @SiteW()
    caption(@Body() captionPageSiteDto: CaptionPageSiteDto){
        return this.pageSiteService.caption(captionPageSiteDto);
    }

    @Post('subheading')
    @SiteW()
    subheading(@Body() subheadingPageSiteDto: SubheadingPageSiteDto){
        return this.pageSiteService.subheading(subheadingPageSiteDto);
    }

    @Post('logo')
    @SiteW()
    logo(@Body() logoPageSieDto: LogoPathPageSiteDto){
        return this.pageSiteService.logo(logoPageSieDto);
    }

    @Post('favicon')
    @SiteW()
    favicon(@Body() faviconPageSiteDto: FaviconPageSiteDto){
        return this.pageSiteService.favicon(faviconPageSiteDto);
    }
}