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
exports.FooterSiteController = void 0;
const common_1 = require("@nestjs/common");
const footer_site_service_1 = require("./footer.site.service");
const add_footer_site_1 = require("./dto/add.footer.site");
const update_footer_site_1 = require("./dto/update.footer.site");
const del_footer_site_1 = require("./dto/del.footer.site");
const swap_footer_site_1 = require("./dto/swap.footer.site");
const addIgnore_footer_site_1 = require("./dto/addIgnore.footer.site");
const delIgnore_footer_site_1 = require("./dto/delIgnore.footer.site");
const authorization_decorator_1 = require("../../auth/authorization.decorator");
let FooterSiteController = class FooterSiteController {
    constructor(footerSiteService) {
        this.footerSiteService = footerSiteService;
    }
    add(addFooterSiteDto) {
        return this.footerSiteService.add(addFooterSiteDto);
    }
    update(updateFooterSiteDto) {
        return this.footerSiteService.update(updateFooterSiteDto);
    }
    del(delFooterSiteDto) {
        return this.footerSiteService.del(delFooterSiteDto);
    }
    swap(swapFooterSiteDto) {
        return this.footerSiteService.swap(swapFooterSiteDto);
    }
    addIgnore(addIgnoreFooterSiteDto) {
        return this.footerSiteService.addIgnore(addIgnoreFooterSiteDto);
    }
    delIgnore(delIgnoreFooterSiteDto) {
        return this.footerSiteService.delIgnore(delIgnoreFooterSiteDto);
    }
};
exports.FooterSiteController = FooterSiteController;
__decorate([
    (0, common_1.Post)('add'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_footer_site_1.AddFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_footer_site_1.UpdateFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('del'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [del_footer_site_1.DelFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "del", null);
__decorate([
    (0, common_1.Post)('swap'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [swap_footer_site_1.SwapFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "swap", null);
__decorate([
    (0, common_1.Post)('addIgnore'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addIgnore_footer_site_1.AddIgnoreFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "addIgnore", null);
__decorate([
    (0, common_1.Post)('delIgnore'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delIgnore_footer_site_1.DelIgnoreFooterSiteDto]),
    __metadata("design:returntype", void 0)
], FooterSiteController.prototype, "delIgnore", null);
exports.FooterSiteController = FooterSiteController = __decorate([
    (0, common_1.Controller)('site/footer'),
    __metadata("design:paramtypes", [footer_site_service_1.FooterSiteService])
], FooterSiteController);
//# sourceMappingURL=footer.site.controller.js.map