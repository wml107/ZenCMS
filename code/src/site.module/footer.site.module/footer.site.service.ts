import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AddFooterSiteDto } from "./dto/add.footer.site";
import { UpdateFooterSiteDto } from "./dto/update.footer.site";
import { DelFooterSiteDto } from "./dto/del.footer.site";
import { SwapFooterSiteDto } from "./dto/swap.footer.site";
import { AddIgnoreFooterSiteDto } from "./dto/addIgnore.footer.site";
import { DelIgnoreFooterSiteDto } from "./dto/delIgnore.footer.site";
import { SiteService } from "../site.service";
import pkgJson from '../../../package.json';
import { readFileSync, writeFileSync } from "fs";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class FooterSiteService {
    add(addFooterSiteDto: AddFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        if (siteInfo.footer !== undefined) {
            siteInfo.footer.forEach(item => {
                if (item.footerName === addFooterSiteDto.footerName) throw new HttpException("name already exists", ResponseCode.EXISTED_NAME_FAIL);
            });
        } else {
            siteInfo["footer"] = [];
        }
        siteInfo.footer.push({
            footerName: addFooterSiteDto.footerName,
            routerPath: addFooterSiteDto.routerPath
        });
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    update(updateFooterSiteDto: UpdateFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        if (siteInfo.footer === undefined) siteInfo["footer"] = [];
        siteInfo.footer.forEach((index, item) => {
            for (let k of Object.keys(updateFooterSiteDto)) {
                if (k === 'oldFooterName') continue;
                siteInfo.footer[index][k] = updateFooterSiteDto[k];
            }
        });
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    del(delFooterSiteDto: DelFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footer === undefined) siteInfo["footer"] = [];
        siteInfo.footer = siteInfo.footer.filter(item => item.footerName !== delFooterSiteDto.footerName);
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    swap(swapFooterSiteDto: SwapFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footer === undefined) siteInfo["footer"] = [];
        if (swapFooterSiteDto.index1 >= siteInfo.footer.length || swapFooterSiteDto.index2 >= siteInfo.footer.length) throw new HttpException("segment error", ResponseCode.BAD_SEGMENT);
        [siteInfo.footer[swapFooterSiteDto.index1], siteInfo.footer[swapFooterSiteDto.index2]] = [siteInfo.footer[swapFooterSiteDto.index2], siteInfo.footer[swapFooterSiteDto.index1]];
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    addIgnore(addIgnoreFooterSiteDto: AddIgnoreFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footerIgnore !== undefined) {
            siteInfo.footerIgnore.forEach(item => {
                if (item.routerPath === addIgnoreFooterSiteDto.routerPath) throw new HttpException("path already exists", ResponseCode.EXISTED_NAME_FAIL);
            });
        } else {
            siteInfo["footerIgnore"] = [];
        }
        siteInfo.footerIgnore.push({
            routerPath: addIgnoreFooterSiteDto.routerPath,
            ignoreType: addIgnoreFooterSiteDto.ignoreType
        });
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    delIgnore(delIgnoreFooterSiteDto: DelIgnoreFooterSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footerIgnore === undefined) siteInfo["footerIgnore"] = [];
        if (delIgnoreFooterSiteDto.index >= siteInfo.footerIgnore.length) throw new HttpException("Segment Error", ResponseCode.BAD_SEGMENT);
        siteInfo.footerIgnore = siteInfo.footerIgnore.filter( index => index !== delIgnoreFooterSiteDto.index);
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }
}