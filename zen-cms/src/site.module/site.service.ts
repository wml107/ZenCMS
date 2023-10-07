import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import pkgJson from '../../package.json';
import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
import { ResourceService } from "src/resource.module/resource.service";
import { StructureService } from "src/structure.module/structure.service";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class SiteService {
    constructor() {
        SiteService.updateSiteCache();
    }

    private static siteInfo;

    static updateSiteCache() {
        this.siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8"));
        return this.siteInfo;
    }

    get() {
        return generateResponse(ResponseCode.OK, "", SiteService.siteInfo);
    }

    getDataPath() {
        return generateResponse(ResponseCode.OK, "", JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8")).dataPath);
    }

    updateDataPath(updateDataPathSiteDto: UpdateDataPathSiteDto) {
        pkgJson.dataPath = updateDataPathSiteDto.dataPath;
        writeFileSync(__dirname + '/../../../package.json', JSON.stringify(pkgJson));
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