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
exports.AnnouncementSiteService = void 0;
const common_1 = require("@nestjs/common");
const package_json_1 = __importDefault(require("../../../package.json"));
const fs_1 = require("fs");
const site_service_1 = require("../site.service");
const Response_1 = require("../../utils/Response");
let AnnouncementSiteService = class AnnouncementSiteService {
    update(updateAnnouncementSiteDto) {
        let siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["announcement"] = updateAnnouncementSiteDto.content;
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", site_service_1.SiteService.updateSiteCache());
    }
};
exports.AnnouncementSiteService = AnnouncementSiteService;
exports.AnnouncementSiteService = AnnouncementSiteService = __decorate([
    (0, common_1.Injectable)()
], AnnouncementSiteService);
//# sourceMappingURL=announcement.site.service.js.map