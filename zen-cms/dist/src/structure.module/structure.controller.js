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
exports.StructureController = void 0;
const common_1 = require("@nestjs/common");
const structure_service_1 = require("./structure.service");
const addTag_structure_1 = require("./dto/addTag.structure");
const delTag_structure_1 = require("./dto/delTag.structure");
const swapTags_structure_1 = require("./dto/swapTags.structure");
const updateTag_structure_1 = require("./dto/updateTag.structure");
const addNode_structure_1 = require("./dto/addNode.structure");
const delNode_structure_1 = require("./dto/delNode.structure");
const pathAuthorityValidation_1 = require("../utils/pathAuthorityValidation");
const package_json_1 = __importDefault(require("../../package.json"));
const path_1 = __importDefault(require("path"));
const swapNodes_structure_1 = require("./dto/swapNodes.structure");
const updateNode_structure_1 = require("./dto/updateNode.structure");
const getNodesByTag_1 = require("./dto/getNodesByTag");
const authorization_decorator_1 = require("../auth/authorization.decorator");
const Response_1 = require("../utils/Response");
let StructureController = class StructureController {
    constructor(structureService) {
        this.structureService = structureService;
    }
    getTree() {
        return this.structureService.getTree();
    }
    addNode(addNodeStructureDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/content/', package_json_1.default.dataPath + '/resource/content/' + addNodeStructureDto.configPath) || !path_1.default.normalize(package_json_1.default.dataPath + '/resource/content/' + addNodeStructureDto.configPath).endsWith('_catalog.json'))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.structureService.addNode(addNodeStructureDto);
    }
    delNode(delNodeStructureDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/content/', package_json_1.default.dataPath + '/resource/content/' + delNodeStructureDto.configPath) || !path_1.default.normalize(package_json_1.default.dataPath + '/resource/content/' + delNodeStructureDto.configPath).endsWith('_catalog.json'))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.structureService.delNode(delNodeStructureDto);
    }
    swapNodes(swapNodesStructureDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/content/', package_json_1.default.dataPath + '/resource/content/' + swapNodesStructureDto.configPath) || !path_1.default.normalize(package_json_1.default.dataPath + '/resource/content/' + swapNodesStructureDto.configPath).endsWith('_catalog.json'))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.structureService.swapNodes(swapNodesStructureDto);
    }
    updateNode(updateNodeStructureDto) {
        if (!(0, pathAuthorityValidation_1.pathAuthorityValidation)(package_json_1.default.dataPath + '/resource/content/', package_json_1.default.dataPath + '/resource/content/' + updateNodeStructureDto.configPath) || !path_1.default.normalize(package_json_1.default.dataPath + '/resource/content/' + updateNodeStructureDto.configPath).endsWith('_catalog.json'))
            throw new common_1.HttpException('out-of-bounds path', Response_1.ResponseCode.OUT_OF_BOUNDS_PATH);
        return this.structureService.updateNode(updateNodeStructureDto);
    }
    getTags() {
        return this.structureService.getTags();
    }
    addTag(addTagStructureDto) {
        return this.structureService.addTag(addTagStructureDto);
    }
    delTag(delTagStructureDto) {
        return this.structureService.delTag(delTagStructureDto);
    }
    swapTags(swapTagsStructureDto) {
        return this.structureService.swapTags(swapTagsStructureDto);
    }
    updateTag(updateTagStructureDto) {
        return this.structureService.updateTag(updateTagStructureDto);
    }
    getNodesByTag(getNodesByTagSructureDto) {
        return this.structureService.getNodesByTag(getNodesByTagSructureDto);
    }
};
exports.StructureController = StructureController;
__decorate([
    (0, common_1.Get)('getTree'),
    (0, authorization_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "getTree", null);
__decorate([
    (0, common_1.Post)('addNode'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addNode_structure_1.AddNodeStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "addNode", null);
__decorate([
    (0, common_1.Post)('delNode'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delNode_structure_1.DelNodeStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "delNode", null);
__decorate([
    (0, common_1.Post)('swapNodes'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [swapNodes_structure_1.SwapNodesStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "swapNodes", null);
__decorate([
    (0, common_1.Post)('updateNode'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateNode_structure_1.UpdateNodeStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "updateNode", null);
__decorate([
    (0, common_1.Get)('getTags'),
    (0, authorization_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "getTags", null);
__decorate([
    (0, common_1.Post)('addTag'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addTag_structure_1.AddTagStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "addTag", null);
__decorate([
    (0, common_1.Post)('delTag'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delTag_structure_1.DelTagStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "delTag", null);
__decorate([
    (0, common_1.Post)('swapTags'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [swapTags_structure_1.SwapTagsStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "swapTags", null);
__decorate([
    (0, common_1.Post)('updateTag'),
    (0, authorization_decorator_1.StructureW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateTag_structure_1.UpdateTagStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "updateTag", null);
__decorate([
    (0, common_1.Post)('getNodesByTag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getNodesByTag_1.GetNodesByTagStructureDto]),
    __metadata("design:returntype", void 0)
], StructureController.prototype, "getNodesByTag", null);
exports.StructureController = StructureController = __decorate([
    (0, common_1.Controller)("structure"),
    __metadata("design:paramtypes", [structure_service_1.StructureService])
], StructureController);
//# sourceMappingURL=structure.controller.js.map