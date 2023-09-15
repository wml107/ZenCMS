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
var StructureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureService = void 0;
const common_1 = require("@nestjs/common");
const package_json_1 = __importDefault(require("../../package.json"));
const fs_1 = require("fs");
const mapSerialize_1 = require("../utils/mapSerialize");
const Response_1 = require("../utils/Response");
const watch = require('node-watch');
class ResourceMap {
    constructor({ routerPath = '', realPath = '', mind = false, type = 'content_m', tags = [], views = 0, cover = '', child = null, belong = '_root' }) {
        this.routerPath = routerPath;
        this.realPath = realPath;
        this.mind = mind;
        this.type = type;
        this.tags = tags;
        this.views = views;
        this.cover = cover;
        this.child = child;
        this.belong = belong;
    }
}
function structureTreeBuild(parentRouterPath = '', parentRealPath = '', belong = '_root') {
    if (!(0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/content" + parentRealPath + "/_catalog.json"))
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", JSON.stringify({ tags: [], catalog: [] }));
    if ((0, fs_1.statSync)(package_json_1.default.dataPath + "/resource/content" + parentRealPath + "/_catalog.json").isDirectory())
        throw Error("配置文件名称被名为_catalog.json的同名目录占用");
    let catalogFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", "utf-8"));
    if (catalogFile.catalog === undefined) {
        catalogFile["catalog"] = [];
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", JSON.stringify(catalogFile));
    }
    let catalog = catalogFile.catalog;
    let _structureTree = new Map();
    catalog.forEach(item => {
        _structureTree.set(item.type === 'index_m' || item.type === 'index_h' || item.type === 'index_j' ? '_index' : item.name, new ResourceMap({
            routerPath: parentRouterPath + "/" + item.name,
            realPath: parentRealPath + "/" + item.path,
            mind: item.mind,
            type: item.type,
            tags: item.tags,
            views: item.views,
            cover: item.cover,
            belong: belong,
            child: item.type === 'child' ? structureTreeBuild(parentRouterPath + "/" + item.name, parentRealPath + "/" + item.path, item.name) : null
        }));
    });
    return _structureTree;
}
let StructureService = StructureService_1 = class StructureService {
    constructor() {
        console.log('-------------加载菜单缓存-------------');
        StructureService_1.updateStructureTreeCache();
        setInterval(() => {
            StructureService_1.updateStructureTreeCache();
        }, 1000 * 60 * 30);
        console.log('-----------菜单缓存加载成功-----------');
        console.log('-------------加载标签缓存-------------');
        StructureService_1.updateTagCache();
        watch(package_json_1.default.dataPath + "/resource/content/_catalog.json", { recursive: true }, (event, name) => {
            StructureService_1.updateTagCache();
        });
        console.log('-----------标签缓存加载成功-----------');
    }
    getTree() {
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", mapSerialize_1.MapSerialize.mapToObj(StructureService_1.structureTree));
    }
    addNode(addNodeStructureDto) {
        let catalogFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/" + addNodeStructureDto.configPath, "utf-8"));
        catalogFile.catalog.forEach(item => {
            if (item.name === addNodeStructureDto.name)
                throw new common_1.HttpException("name already exist", Response_1.ResponseCode.EXISTED_NAME_FAIL);
        });
        catalogFile.catalog.push({
            "name": addNodeStructureDto.name,
            "path": addNodeStructureDto.path,
            "tags": addNodeStructureDto.tags,
            "type": addNodeStructureDto.type,
            "mind": addNodeStructureDto.mind,
            "cover": addNodeStructureDto.cover,
            "views": 0
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + addNodeStructureDto.configPath, JSON.stringify(catalogFile));
        const res = StructureService_1.updateStructureTreeCache();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", mapSerialize_1.MapSerialize.mapToObj(res));
    }
    delNode(delNodeStructureDto) {
        let catalogFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/" + delNodeStructureDto.configPath, "utf-8"));
        catalogFile.catalog = catalogFile.catalog.filter(item => item.name !== delNodeStructureDto.nodeName);
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + delNodeStructureDto.configPath, JSON.stringify(catalogFile));
        const res = StructureService_1.updateStructureTreeCache();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", mapSerialize_1.MapSerialize.mapToObj(res));
    }
    swapNodes(swapNodesStructureDto) {
        let catalogFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/" + swapNodesStructureDto.configPath, 'utf-8'));
        if (swapNodesStructureDto.index1 >= catalogFile.catalog.length || swapNodesStructureDto.index2 >= catalogFile.catalog.length)
            throw new common_1.HttpException("segment error.", Response_1.ResponseCode.BAD_SEGMENT);
        [catalogFile.catalog[swapNodesStructureDto.index1], catalogFile.catalog[swapNodesStructureDto.index2]] = [catalogFile.catalog[swapNodesStructureDto.index2], catalogFile.catalog[swapNodesStructureDto.index1]];
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + swapNodesStructureDto.configPath, JSON.stringify(catalogFile));
        const res = StructureService_1.updateStructureTreeCache();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", mapSerialize_1.MapSerialize.mapToObj(res));
    }
    updateNode(updateNodeStructureDto) {
        let catalogFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/" + updateNodeStructureDto.configPath, 'utf-8'));
        catalogFile.catalog.forEach((item, index) => {
            if (item.name === updateNodeStructureDto.oldName) {
                for (let k of Object.keys(updateNodeStructureDto)) {
                    if (k === 'oldName' || k === 'configPath')
                        continue;
                    catalogFile.catalog[index][k] = updateNodeStructureDto[k];
                }
            }
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + updateNodeStructureDto.configPath, JSON.stringify(catalogFile));
        const res = StructureService_1.updateStructureTreeCache();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", mapSerialize_1.MapSerialize.mapToObj(res));
    }
    getTags() {
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", StructureService_1.tagList);
    }
    addTag(addTagStructureDto) {
        let repeat = false;
        StructureService_1.tagList.forEach(item => {
            if (item == addTagStructureDto.tagName)
                repeat = true;
        });
        if (repeat)
            return "同名标签已经存在。";
        let tagFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags.push(addTagStructureDto.tagName);
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", tagFile.tags);
    }
    delTag(delTagStructureDto) {
        let tagFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags = tagFile.tags.filter(item => item !== delTagStructureDto.tagName);
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", tagFile.tags);
    }
    swapTags(swapTagsStructureDto) {
        let tagFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", "utf-8"));
        if (swapTagsStructureDto.index1 >= tagFile.tags.length || swapTagsStructureDto.index2 >= tagFile.tags.length)
            throw new common_1.HttpException("segment error.", common_1.HttpStatus.BAD_REQUEST);
        [tagFile.tags[swapTagsStructureDto.index1], tagFile.tags[swapTagsStructureDto.index2]] = [tagFile.tags[swapTagsStructureDto.index2], tagFile.tags[swapTagsStructureDto.index1]];
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", tagFile.tags);
    }
    updateTag(updateTagStructureDto) {
        let tagFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags.forEach((item, index) => {
            if (item === updateTagStructureDto.oldTagName) {
                tagFile.tags[index] = updateTagStructureDto.newTagName;
            }
        });
        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", tagFile.tags);
    }
    getNodesByTag(getNodesByTagStructureDto) {
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", StructureService_1.getNodesByTag(getNodesByTagStructureDto.tagName));
    }
    static updateTagCache() {
        try {
            let tagFile = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", "utf-8"));
            if (tagFile.tags === undefined) {
                tagFile["tags"] = [];
                (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
            }
            this.tagList = [];
            tagFile.tags.forEach(item => {
                this.tagList.push(item);
            });
        }
        catch (err) {
            console.log(err);
            throw Error("tags cache update failure");
        }
        return this.tagList;
    }
    static updateStructureTreeCache() {
        try {
            this.structureTree = structureTreeBuild();
        }
        catch (err) {
            console.log(err);
            throw Error("structure tree cache update failure");
        }
        return this.structureTree;
    }
    static getNodesByTag(tagName, startAt = this.structureTree) {
        let res = [];
        startAt.forEach((value, key, map) => {
            for (let i = 0; i < value.tags.length; i++) {
                if (value.tags[i] === tagName) {
                    res.push({
                        routerPath: value.routerPath,
                        realPath: value.realPath,
                        mind: value.mind,
                        type: value.type,
                        tags: value.tags,
                        views: value.views,
                        cover: value.cover
                    });
                    break;
                }
            }
            if (value.type === 'child')
                res.push(...this.getNodesByTag(tagName, value.child));
        });
        return res;
    }
};
exports.StructureService = StructureService;
StructureService.structureTree = null;
StructureService.tagList = [];
exports.StructureService = StructureService = StructureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StructureService);
//# sourceMappingURL=structure.service.js.map