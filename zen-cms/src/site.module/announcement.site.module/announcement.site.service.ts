import { Injectable } from "@nestjs/common";
import { UpdateAnnouncementSiteDto } from "./dto/update.announcement.site";
import pkgJson from '../../../package.json';
import { readFileSync, writeFileSync } from "fs";
import { SiteService } from "../site.service";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class AnnouncementSiteService{
    update(updateAnnouncementSiteDto: UpdateAnnouncementSiteDto){
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["announcement"] = updateAnnouncementSiteDto.content;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache()); 
    }
}