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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("./resource.service");
const get_resource_1 = require("./dto/get.resource");
const list_resource_1 = require("./dto/list.resource");
const download_resource_1 = require("./dto/download.resource");
const package_json_1 = __importDefault(require("../../package.json"));
const fs_1 = require("fs");
const pathAuthorityValidation_1 = require("../utils/pathAuthorityValidation");
const createFile_resource_1 = require("./dto/createFile.resource");
const createCatalog_resource_1 = require("./dto/createCatalog.resource");
const update_resource_1 = require("./dto/update.resource");
const rename_resource_1 = require("./dto/rename.resource");
const delete_resource_1 = require("./dto/delete.resource");
const recovery_resource_1 = require("./dto/recovery.resource");
const copy_resource_1 = require("./dto/copy.resource");
const cut_resource_1 = require("./dto/cut.resource");
const platform_express_1 = require("@nestjs/platform-express");
const upload_resource_1 = require("./dto/upload.resource");
const import_resource_1 = require("./dto/import.resource");
const site_service_1 = require("../site.module/site.service");
const authorization_decorator_1 = require("../auth/authorization.decorator");
const Response_1 = require("../utils/Response");
const compressing = require('compressing');
let ResourceController = class ResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    get(getResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/content/', package_json_1.default.dataPath + '/resource/content/' + getResourceDto.path))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.get(getResourceDto);
    }
    list(listResourceDto) {
        if (listResourceDto.resourceType !== 'bin' && listResourceDto.resourceType !== 'htmlPlugin' && !(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/' + listResourceDto.resourceType + "/", package_json_1.default.dataPath + '/resource/' + listResourceDto.resourceType + '/' + listResourceDto.path, true))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.list(listResourceDto);
    }
    download(downloadResourceDto, res) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + downloadResourceDto.resourceType + "/", package_json_1.default.dataPath + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        if (!(0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path))
            throw new common_1.HttpException('cannot find resource', common_1.HttpStatus.NOT_FOUND);
        if ((0, fs_1.statSync)(package_json_1.default.dataPath + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path).isDirectory())
            throw new common_1.HttpException('cannot download directory', common_1.HttpStatus.BAD_REQUEST);
        res.download(package_json_1.default.dataPath + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path);
    }
    upload(file, uploadResourceDto) {
        return this.resourceService.upload(file, uploadResourceDto);
    }
    createFile(createFileResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/content", package_json_1.default.dataPath + "/resource/content/" + createFileResourceDto.path + '/' + createFileResourceDto.fileName + '.' + createFileResourceDto.fileType))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        createFileResourceDto.path += '/';
        return this.resourceService.createFile(createFileResourceDto);
    }
    createCatalog(createCatalogResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/", package_json_1.default.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + '/' + createCatalogResourceDto.catalogName))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        createCatalogResourceDto.path += '/';
        return this.resourceService.createCatalog(createCatalogResourceDto);
    }
    update(updateResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/content/", package_json_1.default.dataPath + "/resource/content/" + updateResourceDto.path))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.update(updateResourceDto);
    }
    rename(renameResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + renameResourceDto.resourceType + "/", package_json_1.default.dataPath + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.rename(renameResourceDto);
    }
    copy(copyResourceDto) {
        const resourceType = ['content/', 'htmlPlugin/', 'pic/', 'file/'];
        let isOldPathValid = false;
        let isNewPathValid = false;
        for (let i = 0; i < resourceType.length; i++)
            if ((0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + resourceType[i], package_json_1.default.dataPath + "/resource/" + copyResourceDto.oldPath))
                isOldPathValid = true;
        for (let i = 0; i < resourceType.length; i++)
            if ((0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + resourceType[i], package_json_1.default.dataPath + "/resource/" + copyResourceDto.newPath))
                isNewPathValid = true;
        if (!isOldPathValid || !isNewPathValid)
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.copy(copyResourceDto);
    }
    cut(cutResourceDto) {
        const resourceType = ['content/', 'htmlPlugin/', 'pic/', 'file/'];
        let isOldPathValid = false;
        let isNewPathValid = false;
        for (let i = 0; i < resourceType.length; i++)
            if ((0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + resourceType[i], package_json_1.default.dataPath + "/resource/" + cutResourceDto.oldPath))
                isOldPathValid = true;
        for (let i = 0; i < resourceType.length; i++)
            if ((0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/resource/" + resourceType[i], package_json_1.default.dataPath + "/resource/" + cutResourceDto.newPath))
                isNewPathValid = true;
        if (!isOldPathValid || !isNewPathValid)
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.cut(cutResourceDto);
    }
    delete(deleteResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + deleteResourceDto.type === 'bin' ? "/resource/" : "/bin/" + deleteResourceDto.resourceType + "/", package_json_1.default.dataPath + deleteResourceDto.type === 'bin' ? "/resource/" : "/bin/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.delete(deleteResourceDto);
    }
    recovery(recoveryResourceDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/", package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/" + recoveryResourceDto.fileName))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.resourceService.recovery(recoveryResourceDto);
    }
    async export(res) {
        const tempName = "_datatemp" + Date.now() + ".zip";
        await compressing.zip.compressDir(package_json_1.default.dataPath, package_json_1.default.dataPath + "/../" + tempName);
        res.download(package_json_1.default.dataPath + "/../" + tempName, "data.zip", function (err) {
            (0, fs_1.rmSync)(package_json_1.default.dataPath + "/../" + tempName);
            if (err)
                throw err;
        });
    }
    async import(data, importResourceDto) {
        if (!(0, fs_1.existsSync)(importResourceDto.targetPath) && importResourceDto.targetPath !== "")
            throw new common_1.HttpException('path does not exist', Response_1.ResponseCode.BAD_PATH);
        await this.resourceService.import(data, importResourceDto);
        return site_service_1.SiteService.refreshAllCache();
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, common_1.Post)('get'),
    (0, authorization_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_resource_1.GetResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('list'),
    (0, authorization_decorator_1.ResourceR)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_resource_1.ListResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('download'),
    (0, authorization_decorator_1.ResourceR)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [download_resource_1.DownloadResourceDto, Object]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "download", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, authorization_decorator_1.ResourceW)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, upload_resource_1.UploadResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('createFile'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFile_resource_1.CreateFileResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "createFile", null);
__decorate([
    (0, common_1.Post)('createCatalog'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCatalog_resource_1.CreateCatalogResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "createCatalog", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_resource_1.UpdateResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('rename'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rename_resource_1.RenameResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "rename", null);
__decorate([
    (0, common_1.Post)('copy'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [copy_resource_1.CopyResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "copy", null);
__decorate([
    (0, common_1.Post)('cut'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cut_resource_1.CutResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "cut", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_resource_1.DeleteResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('recovery'),
    (0, authorization_decorator_1.ResourceW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recovery_resource_1.RecoveryResourceDto]),
    __metadata("design:returntype", void 0)
], ResourceController.prototype, "recovery", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, authorization_decorator_1.ResourceR)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "export", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, authorization_decorator_1.ResourceW)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('data')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, import_resource_1.ImportResourceDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "import", null);
exports.ResourceController = ResourceController = __decorate([
    (0, common_1.Controller)('resource'),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], ResourceController);
//# sourceMappingURL=resource.controller.js.map