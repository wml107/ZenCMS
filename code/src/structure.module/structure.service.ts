import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import pkgJson from "../../package.json";
import { existsSync, readFileSync, statSync, unlink, unlinkSync, writeFileSync } from "fs";
import { AddTagStructureDto } from "./dto/addTag.structure";
import { DelTagStructureDto } from "./dto/delTag.structure";
import { SwapTagsStructureDto } from "./dto/swapTags.structure";
import { UpdateTagStructureDto } from "./dto/updateTag.structure";
import { AddNodeStructureDto } from "./dto/addNode.structure";
import { MapSerialize } from "src/utils/mapSerialize";
import { DelNodeStructureDto } from "./dto/delNode.structure";
import { SwapNodesStructureDto } from "./dto/swapNodes.structure";
import { UpdateNodeStructureDto } from "./dto/updateNode.structure";
import { GetNodesByTagStructureDto } from "./dto/getNodesByTag";
import { ResponseCode, generateResponse } from "src/utils/Response";
const watch = require('node-watch');


class ResourceMap {
    routerPath: string;
    realPath: string;
    mind: boolean;
    type: string;
    tags: string[];
    views: number;
    cover: string;
    child: StructureTree;
    belong: string
    constructor({
        routerPath = '',
        realPath = '',
        mind = false,
        type = 'content_m',
        tags = [],
        views = 0,
        cover = '',
        child = null,
        belong = '_root'
    }) {
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
type StructureTree = Map<string, ResourceMap>; 
function structureTreeBuild(parentRouterPath: string = '', parentRealPath: string = '', belong: string = '_root'): StructureTree {
    //确保配置文件可达
    if (!existsSync(pkgJson.dataPath + "/resource/content" + parentRealPath + "/_catalog.json")) writeFileSync(pkgJson.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", JSON.stringify({ tags: [], catalog: [] }));
    if (statSync(pkgJson.dataPath + "/resource/content" + parentRealPath + "/_catalog.json").isDirectory()) throw Error("配置文件名称被名为_catalog.json的同名目录占用");
    //扫描加载结构树
    let catalogFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", "utf-8")); 
    if (catalogFile.catalog === undefined) { 
        catalogFile["catalog"] = [];
        writeFileSync(pkgJson.dataPath + "/resource/content" + parentRealPath + "/_catalog.json", JSON.stringify(catalogFile));
    } 
    let catalog = catalogFile.catalog;
    let _structureTree = new Map<string, ResourceMap>();
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
 
@Injectable()
export class StructureService {
    constructor() {
        //将一些数据载入内存进行缓存；并对缓存对应数据监听当数据发生变动时，更新缓存。
        console.log('-------------加载菜单缓存-------------');
        StructureService.updateStructureTreeCache();
        setInterval(() => {
            StructureService.updateStructureTreeCache();
        }, 1000 * 60 * 30);
        console.log('-----------菜单缓存加载成功-----------');

        console.log('-------------加载标签缓存-------------');
        StructureService.updateTagCache();
        watch(pkgJson.dataPath + "/resource/content/_catalog.json", { recursive: true },
            (event, name) => {
                StructureService.updateTagCache();
            });
        console.log('-----------标签缓存加载成功-----------');
    }

    private static structureTree: StructureTree = null;
    private static tagList: string[] = [];

    getTree() {
        return generateResponse(ResponseCode.OK, "", MapSerialize.mapToObj(StructureService.structureTree));
    }

    addNode(addNodeStructureDto: AddNodeStructureDto) {
        let catalogFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/" + addNodeStructureDto.configPath, "utf-8"));
        catalogFile.catalog.forEach(item => {
            if (item.name === addNodeStructureDto.name) throw new HttpException("name already exist", ResponseCode.EXISTED_NAME_FAIL);
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
        writeFileSync(pkgJson.dataPath + "/resource/content/" + addNodeStructureDto.configPath, JSON.stringify(catalogFile));

        const res = StructureService.updateStructureTreeCache();
        return generateResponse(ResponseCode.OK, "", MapSerialize.mapToObj(res));
    }

    delNode(delNodeStructureDto: DelNodeStructureDto) {
        let catalogFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/" + delNodeStructureDto.configPath, "utf-8"));
        catalogFile.catalog = catalogFile.catalog.filter(item => item.name !== delNodeStructureDto.nodeName);
        writeFileSync(pkgJson.dataPath + "/resource/content/" + delNodeStructureDto.configPath, JSON.stringify(catalogFile));

        const res = StructureService.updateStructureTreeCache();
        return generateResponse(ResponseCode.OK, "", MapSerialize.mapToObj(res));
    }

    swapNodes(swapNodesStructureDto: SwapNodesStructureDto) {
        let catalogFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/" + swapNodesStructureDto.configPath, 'utf-8'));
        if (swapNodesStructureDto.index1 >= catalogFile.catalog.length || swapNodesStructureDto.index2 >= catalogFile.catalog.length) throw new HttpException("segment error.", ResponseCode.BAD_SEGMENT);

        [catalogFile.catalog[swapNodesStructureDto.index1], catalogFile.catalog[swapNodesStructureDto.index2]] = [catalogFile.catalog[swapNodesStructureDto.index2], catalogFile.catalog[swapNodesStructureDto.index1]];
        writeFileSync(pkgJson.dataPath + "/resource/content/" + swapNodesStructureDto.configPath, JSON.stringify(catalogFile));

        const res = StructureService.updateStructureTreeCache();
        return generateResponse(ResponseCode.OK, "", MapSerialize.mapToObj(res));
    }

    updateNode(updateNodeStructureDto: UpdateNodeStructureDto) {
        let catalogFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/" + updateNodeStructureDto.configPath, 'utf-8'));
        catalogFile.catalog.forEach((item, index) => {
            if (item.name === updateNodeStructureDto.oldName) {
                for (let k of Object.keys(updateNodeStructureDto)) {
                    if (k === 'oldName' || k === 'configPath') continue;
                    catalogFile.catalog[index][k] = updateNodeStructureDto[k];
                }
            }
        });
        writeFileSync(pkgJson.dataPath + "/resource/content/" + updateNodeStructureDto.configPath, JSON.stringify(catalogFile));

        const res = StructureService.updateStructureTreeCache();
        return generateResponse(ResponseCode.OK, "", MapSerialize.mapToObj(res));
    }

    getTags() {
        return generateResponse(ResponseCode.OK, "", StructureService.tagList);
    }

    addTag(addTagStructureDto: AddTagStructureDto) {
        let repeat = false;
        StructureService.tagList.forEach(item => {
            if (item == addTagStructureDto.tagName) repeat = true;
        });
        if (repeat) return "同名标签已经存在。";


        let tagFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags.push(addTagStructureDto.tagName);
        writeFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));

        return generateResponse(ResponseCode.OK, "", tagFile.tags);
    }

    delTag(delTagStructureDto: DelTagStructureDto) {
        let tagFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags = tagFile.tags.filter(item => item !== delTagStructureDto.tagName);
        writeFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return generateResponse(ResponseCode.OK, "", tagFile.tags);
    }

    swapTags(swapTagsStructureDto: SwapTagsStructureDto) {
        let tagFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", "utf-8"));
        if (swapTagsStructureDto.index1 >= tagFile.tags.length || swapTagsStructureDto.index2 >= tagFile.tags.length) throw new HttpException("segment error.", HttpStatus.BAD_REQUEST);

        [tagFile.tags[swapTagsStructureDto.index1], tagFile.tags[swapTagsStructureDto.index2]] = [tagFile.tags[swapTagsStructureDto.index2], tagFile.tags[swapTagsStructureDto.index1]];
        writeFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return generateResponse(ResponseCode.OK, "", tagFile.tags);
    }

    updateTag(updateTagStructureDto: UpdateTagStructureDto) {
        let tagFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", "utf-8"));
        tagFile.tags.forEach((item, index) => {
            if (item === updateTagStructureDto.oldTagName) {
                tagFile.tags[index] = updateTagStructureDto.newTagName;
            }
        });
        writeFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
        return generateResponse(ResponseCode.OK, "", tagFile.tags);
    }

    getNodesByTag(getNodesByTagStructureDto: GetNodesByTagStructureDto){
        return generateResponse(ResponseCode.OK, "", StructureService.getNodesByTag(getNodesByTagStructureDto.tagName));
    }

    static updateTagCache(): string[] {
        try {
            let tagFile = JSON.parse(readFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", "utf-8"));
            if (tagFile.tags === undefined) {
                tagFile["tags"] = [];
                writeFileSync(pkgJson.dataPath + "/resource/content/_catalog.json", JSON.stringify(tagFile));
            }

            this.tagList = [];
            tagFile.tags.forEach(item => {
                this.tagList.push(item);
            });
        } catch (err) {
            console.log(err);
            throw Error("tags cache update failure");
        }
        return this.tagList;
    }

    static updateStructureTreeCache(): StructureTree {
        try {
            this.structureTree = structureTreeBuild();
        } catch (err) {
            console.log(err);
            throw Error("structure tree cache update failure");
        }
        return this.structureTree;
    }

    private static getNodesByTag(tagName: string, startAt: StructureTree = this.structureTree): {
        routerPath: string;
        realPath: string;
        mind: boolean;
        type: string;
        tags: string[];
        views: number;
        cover: string;
    }[] {
        let res = [];
        //深度优先搜索
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
            if (value.type === 'child') res.push(...this.getNodesByTag(tagName, value.child));
        });
        return res;
    }
}