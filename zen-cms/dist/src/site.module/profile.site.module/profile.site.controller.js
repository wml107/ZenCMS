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
exports.ProfileSiteController = void 0;
const profile_site_service_1 = require("./profile.site.service");
const common_1 = require("@nestjs/common");
const updateNickname_profile_site_1 = require("./dto/updateNickname.profile.site");
const updateAvatar_profile_site_1 = require("./dto/updateAvatar.profile.site");
const addBio_profile_site_1 = require("./dto/addBio.profile.site");
const delBio_profile_site_1 = require("./dto/delBio.profile.site");
const updateBio_profile_site_1 = require("./dto/updateBio.profile.site");
const authorization_decorator_1 = require("../../auth/authorization.decorator");
let ProfileSiteController = class ProfileSiteController {
    constructor(profileSiteService) {
        this.profileSiteService = profileSiteService;
    }
    updateNickname(updateNicknameProfileSiteDto) {
        return this.profileSiteService.updateNickname(updateNicknameProfileSiteDto);
    }
    updateAvatar(updateAvatarProfileSiteDto) {
        return this.profileSiteService.updateAvatar(updateAvatarProfileSiteDto);
    }
    addBio(addBioProfileSiteDto) {
        return this.profileSiteService.addBio(addBioProfileSiteDto);
    }
    delBio(delBioProfileSiteDto) {
        return this.profileSiteService.delBio(delBioProfileSiteDto);
    }
    updateBio(updateBioProfileSiteDto) {
        return this.profileSiteService.updateBio(updateBioProfileSiteDto);
    }
};
exports.ProfileSiteController = ProfileSiteController;
__decorate([
    (0, common_1.Post)('updateNickname'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateNickname_profile_site_1.UpdateNicknameProfileSiteDto]),
    __metadata("design:returntype", void 0)
], ProfileSiteController.prototype, "updateNickname", null);
__decorate([
    (0, common_1.Post)('updateAvatar'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateAvatar_profile_site_1.UpdateAvatarProfileSiteDto]),
    __metadata("design:returntype", void 0)
], ProfileSiteController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Post)('addBio'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addBio_profile_site_1.AddBioProfileSiteDto]),
    __metadata("design:returntype", void 0)
], ProfileSiteController.prototype, "addBio", null);
__decorate([
    (0, common_1.Post)('delBio'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delBio_profile_site_1.DelBioProfileSiteDto]),
    __metadata("design:returntype", void 0)
], ProfileSiteController.prototype, "delBio", null);
__decorate([
    (0, common_1.Post)('updateBio'),
    (0, authorization_decorator_1.SiteW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBio_profile_site_1.UpdateBioProfileSiteDto]),
    __metadata("design:returntype", void 0)
], ProfileSiteController.prototype, "updateBio", null);
exports.ProfileSiteController = ProfileSiteController = __decorate([
    (0, common_1.Controller)('site/profile'),
    __metadata("design:paramtypes", [profile_site_service_1.ProfileSiteService])
], ProfileSiteController);
//# sourceMappingURL=profile.site.controller.js.map