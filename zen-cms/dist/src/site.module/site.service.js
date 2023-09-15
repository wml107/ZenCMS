"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SiteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const package_json_1 = __importDefault(require("../../package.json"));
const resource_service_1 = require("../resource.module/resource.service");
const structure_service_1 = require("../structure.module/structure.service");
const Response_1 = require("../utils/Response");
let SiteService = SiteService_1 = class SiteService {
    constructor() {
        SiteService_1.updateSiteCache();
    }
    static updateSiteCache() {
        this.siteInfo = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8"));
        return this.siteInfo;
    }
    get() {
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", SiteService_1.siteInfo);
    }
    getDataPath() {
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/site/site.json", "utf-8")).dataPath);
    }
    updateDataPath(updateDataPathSiteDto) {
        package_json_1.default.dataPath = updateDataPathSiteDto.dataPath;
        (0, fs_1.writeFileSync)(__dirname + '/../../../package.json', JSON.stringify(package_json_1.default));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    static refreshAllCache() {
        resource_service_1.ResourceService.initDirectory();
        resource_service_1.ResourceService.updateHtmlPluginCache();
        structure_service_1.StructureService.updateTagCache();
        structure_service_1.StructureService.updateStructureTreeCache();
        SiteService_1.updateSiteCache();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
};
exports.SiteService = SiteService;
exports.SiteService = SiteService = SiteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SiteService);
//# sourceMappingURL=site.service.js.map