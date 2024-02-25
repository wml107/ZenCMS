import { Injectable } from "@nestjs/common";
import { UpdateAnnouncementSiteDto } from "./dto/update.announcement.site";
import Config from '../../utils/Config';
import { readFileSync, writeFileSync } from "fs";
import { SiteService } from "../site.service";
import { ResponseCode, generateResponse } from "src/utils/Response";

const config = new Config();

@Injectable()
export class AnnouncementSiteService{
    update(updateAnnouncementSiteDto: UpdateAnnouncementSiteDto){
        let siteInfo = JSON.parse(readFileSync(config.getConfig('DATA_PATH') + "/site/site.json", 'utf-8'));
        siteInfo["announcement"] = updateAnnouncementSiteDto.content;
        writeFileSync(config.getConfig('DATA_PATH') + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache()); 
    }
}