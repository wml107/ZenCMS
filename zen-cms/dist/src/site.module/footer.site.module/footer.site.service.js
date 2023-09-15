"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterSiteService = void 0;
const common_1 = require("@nestjs/common");
const site_service_1 = require("../site.service");
const package_json_1 = __importDefault(require("../../../package.json"));
const fs_1 = require("fs");
const Response_1 = require("../../utils/Response");
let FooterSiteService = class FooterSiteService {
    add(addFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", 'utf-8'));
        if (siteInfo.footer !== undefined) {
            siteInfo.footer.forEach(item => {
                if (item.footerName === addFooterSiteDto.footerName)
                    throw new common_1.HttpException("name already exists", Response_1.ResponseCode.EXISTED_NAME_FAIL);
            });
        }
        else {
            siteInfo["footer"] = [];
        }
        siteInfo.footer.push({
            footerName: addFooterSiteDto.footerName,
            routerPath: addFooterSiteDto.routerPath
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
    update(updateFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", 'utf-8'));
        if (siteInfo.footer === undefined)
            siteInfo["footer"] = [];
        siteInfo.footer.forEach((index, item) => {
            for (let k of Object.keys(updateFooterSiteDto)) {
                if (k === 'oldFooterName')
                    continue;
                siteInfo.footer[index][k] = updateFooterSiteDto[k];
            }
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
    del(delFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footer === undefined)
            siteInfo["footer"] = [];
        siteInfo.footer = siteInfo.footer.filter(item => item.footerName !== delFooterSiteDto.footerName);
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
    swap(swapFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footer === undefined)
            siteInfo["footer"] = [];
        if (swapFooterSiteDto.index1 >= siteInfo.footer.length || swapFooterSiteDto.index2 >= siteInfo.footer.length)
            throw new common_1.HttpException("segment error", Response_1.ResponseCode.BAD_SEGMENT);
        [siteInfo.footer[swapFooterSiteDto.index1], siteInfo.footer[swapFooterSiteDto.index2]] = [siteInfo.footer[swapFooterSiteDto.index2], siteInfo.footer[swapFooterSiteDto.index1]];
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
    addIgnore(addIgnoreFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footerIgnore !== undefined) {
            siteInfo.footerIgnore.forEach(item => {
                if (item.routerPath === addIgnoreFooterSiteDto.routerPath)
                    throw new common_1.HttpException("path already exists", Response_1.ResponseCode.EXISTED_NAME_FAIL);
            });
        }
        else {
            siteInfo["footerIgnore"] = [];
        }
        siteInfo.footerIgnore.push({
            routerPath: addIgnoreFooterSiteDto.routerPath,
            ignoreType: addIgnoreFooterSiteDto.ignoreType
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
    delIgnore(delIgnoreFooterSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8"));
        if (siteInfo.footerIgnore === undefined)
            siteInfo["footerIgnore"] = [];
        if (delIgnoreFooterSiteDto.index >= siteInfo.footerIgnore.length)
            throw new common_1.HttpException("Segment Error", Response_1.ResponseCode.BAD_SEGMENT);
        siteInfo.footerIgnore = siteInfo.footerIgnore.filter(index => index !== delIgnoreFooterSiteDto.index);
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
};
exports.FooterSiteService = FooterSiteService;
exports.FooterSiteService = FooterSiteService = __decorate([
    (0, common_1.Injectable)()
], FooterSiteService);
//# sourceMappingURL=footer.site.service.js.map