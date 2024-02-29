import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import Config from "src/utils/Config";
import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
import { ResourceService } from "src/resource.module/resource.service";
import { StructureService } from "src/structure.module/structure.service";
import { ResponseCode, generateResponse } from "src/utils/Response";
import path from "path";

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
        return generateResponse(ResponseCode.OK, "", path.normalize(DATA_PATH));
    }

    //暂时还没找到写入env的方法，env可以写，但写入之后这个文件无法被nestjs监听到，没有办法重启重载，为了强制让用户重启更新配置以免引起错误，目前这种操作会强行关闭应用。所以这个方法目前前端没有调用，被空置。
    updateDataPath(updateDataPathSiteDto: UpdateDataPathSiteDto) {
        const newPath = updateDataPathSiteDto.dataPath;
        setTimeout(() => {
            config.setConfig('DATA_PATH', newPath);
        }, 3000);
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