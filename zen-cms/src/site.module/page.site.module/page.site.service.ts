import { Injectable } from "@nestjs/common";
import { SiteService } from "../site.service";
import { CaptionPageSiteDto } from "./dto/caption.page.site";
import { SubheadingPageSiteDto } from "./dto/subheading.page.site";
import { LogoPathPageSiteDto } from "./dto/logoPath.page.site";
import { FaviconPageSiteDto } from "./dto/favicon.page.site";
import Config from '../../utils/Config';
import { readFileSync, writeFileSync } from "fs";
import { ResponseCode, generateResponse } from "src/utils/Response";

const config = new Config();
const DATA_PATH = config.getConfig('DATA_PATH');

@Injectable()
export class PageSiteService{
    caption(captionPageSiteDto: CaptionPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(DATA_PATH + "/site/site.json", 'utf-8'));
        siteInfo["caption"] = captionPageSiteDto.caption;
        writeFileSync(DATA_PATH + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    subheading(subheadingPageSiteDto: SubheadingPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(DATA_PATH + "/site/site.json", 'utf-8'));
        siteInfo["subheading"] = subheadingPageSiteDto.subheading;
        writeFileSync(DATA_PATH + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    logo(logoPageSieDto: LogoPathPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(DATA_PATH + "/site/site.json", 'utf-8'));
        siteInfo["logo"] = logoPageSieDto.logoPath;
        writeFileSync(DATA_PATH + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    favicon(faviconPageSiteDto: FaviconPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(DATA_PATH + "/site/site.json", 'utf-8'));
        siteInfo["favicon"] = faviconPageSiteDto.faviconPath;
        writeFileSync(DATA_PATH + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }
}