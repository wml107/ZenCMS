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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSiteController = void 0;
const common_1 = require("@nestjs/common");
const page_site_service_1 = require("./page.site.service");
const caption_page_site_1 = require("./dto/caption.page.site");
const subheading_page_site_1 = require("./dto/subheading.page.site");
const logoPath_page_site_1 = require("./dto/logoPath.page.site");
const favicon_page_site_1 = require("./dto/favicon.page.site");
const authorization_decorator_1 = require("../../auth/authorization.decorator");
let PageSiteController = class PageSiteController {
    constructor(pageSiteService) {
        this.pageSiteService = pageSiteService;
    }
    caption(captionPageSiteDto) {
        return this.pageSiteService.caption(captionPageSiteDto);
    }
    subheading(subheadingPageSiteDto) {
        return this.pageSiteService.subheading(subheadingPageSiteDto);
    }
    logo(logoPageSieDto) {
        return this.pageSiteService.logo(logoPageSieDto);
    }
    favicon(faviconPageSiteDto) {
        return this.pageSiteService.favicon(faviconPageSiteDto);
    }
};
exports.PageSiteController = PageSiteController;
__decorate([
    (0, common_1.Post)('caption'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [caption_page_site_1.CaptionPageSiteDto]),
    __metadata("design:returntype", void 0)
], PageSiteController.prototype, "caption", null);
__decorate([
    (0, common_1.Post)('subheading'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subheading_page_site_1.SubheadingPageSiteDto]),
    __metadata("design:returntype", void 0)
], PageSiteController.prototype, "subheading", null);
__decorate([
    (0, common_1.Post)('logo'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logoPath_page_site_1.LogoPathPageSiteDto]),
    __metadata("design:returntype", void 0)
], PageSiteController.prototype, "logo", null);
__decorate([
    (0, common_1.Post)('favicon'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favicon_page_site_1.FaviconPageSiteDto]),
    __metadata("design:returntype", void 0)
], PageSiteController.prototype, "favicon", null);
exports.PageSiteController = PageSiteController = __decorate([
    (0, common_1.Controller)('site/page'),
    __metadata("design:paramtypes", [page_site_service_1.PageSiteService])
], PageSiteController);
//# sourceMappingURL=page.site.controller.js.map