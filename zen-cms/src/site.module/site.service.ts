import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import Config from "src/utils/Config";
import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
import { ResourceService } from "src/resource.module/resource.service";
import { StructureService } from "src/structure.module/structure.service";
import { ResponseCode, generateResponse } from "src/utils/Response";

const config = new Config();
const DATA_PATH = config.getConfig('DATA_PATH');

@Injectable()
export class SiteService {
    constructor() {
        SiteService.updateSiteCache();
    }

    private static siteInfo;

    static updateSiteCache() {
        this.siteInfo = JSON.parse(readFileSync(DATA_PATH + "/site/site.json", "utf-8"));
        return this.siteInfo;
    }

    get() {
        return generateResponse(ResponseCode.OK, "", SiteService.siteInfo);
    }

    getDataPath() {
        return generateResponse(ResponseCode.OK, "", JSON.parse(readFileSync(DATA_PATH + "/site/site.json", "utf-8")).dataPath);
    }

    //暂时还没找到写入env的方法
    updateDataPath(updateDataPathSiteDto: UpdateDataPathSiteDto) {
        const newPath = updateDataPathSiteDto.dataPath;
        //写入.env
        return generateResponse(ResponseCode.OK, "", null);
    }

    static refreshAllCache() {
        ResourceService.initDirectory();
        ResourceService.updateHtmlPluginCache();
        StructureService.updateTagCache();
        StructureService.updateStructureTreeCache();
        SiteService.updateSiteCache();
        return true;
    }
}