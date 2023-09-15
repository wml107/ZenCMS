import { PageSiteService } from "./page.site.service";
import { CaptionPageSiteDto } from "./dto/caption.page.site";
import { SubheadingPageSiteDto } from "./dto/subheading.page.site";
import { LogoPathPageSiteDto } from "./dto/logoPath.page.site";
import { FaviconPageSiteDto } from "./dto/favicon.page.site";
export declare class PageSiteController {
    private pageSiteService;
    constructor(pageSiteService: PageSiteService);
    caption(captionPageSiteDto: CaptionPageSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    subheading(subheadingPageSiteDto: SubheadingPageSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    logo(logoPageSieDto: LogoPathPageSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    favicon(faviconPageSiteDto: FaviconPageSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
}
