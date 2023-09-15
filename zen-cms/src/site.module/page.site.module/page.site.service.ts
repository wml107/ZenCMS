import { Injectable } from "@nestjs/common";
import { SiteService } from "../site.service";
import { CaptionPageSiteDto } from "./dto/caption.page.site";
import { SubheadingPageSiteDto } from "./dto/subheading.page.site";
import { LogoPathPageSiteDto } from "./dto/logoPath.page.site";
import { FaviconPageSiteDto } from "./dto/favicon.page.site";
import pkgJson from '../../../package.json';
import { readFileSync, writeFileSync } from "fs";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class PageSiteService{
    caption(captionPageSiteDto: CaptionPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["caption"] = captionPageSiteDto.caption;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    subheading(subheadingPageSiteDto: SubheadingPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["subheading"] = subheadingPageSiteDto.subheading;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    logo(logoPageSieDto: LogoPathPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["logo"] = logoPageSieDto.logoPath;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    favicon(faviconPageSiteDto: FaviconPageSiteDto){
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["favicon"] = faviconPageSiteDto.faviconPath;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }
}