import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { StructureService } from "./structure.service";
import { AddTagStructureDto } from "./dto/addTag.structure";
import { DelTagStructureDto } from "./dto/delTag.structure";
import { SwapTagsStructureDto } from "./dto/swapTags.structure";
import { UpdateTagStructureDto } from "./dto/updateTag.structure";
import { AddNodeStructureDto } from "./dto/addNode.structure";
import { DelNodeStructureDto } from "./dto/delNode.structure";
import { pathAuthorityValidation } from "src/utils/pathAuthorityValidation";
import Config from '../utils/Config';
import path from "path";
import { SwapNodesStructureDto } from "./dto/swapNodes.structure";
import { UpdateNodeStructureDto } from "./dto/updateNode.structure";
import { GetNodesByTagStructureDto } from "./dto/getNodesByTag";
import { Public, StructureW } from "src/auth/authorization.decorator";
import { ResponseCode } from "src/utils/Response";

const config = new Config();
const DATA_PATH = config.getConfig('DATA_PATH');

@Controller("structure")
export class StructureController {
    constructor(private structureService: StructureService) { }

    @Get('getTree')
    @Public()
    getTree(){
        return this.structureService.getTree();
    }

    @Post('addNode')
    @StructureW()
    addNode(@Body() addNodeStructureDto: AddNodeStructureDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + '/resource/content/',
            DATA_PATH + '/resource/content/' + addNodeStructureDto.configPath
        ) || !path.normalize(DATA_PATH + '/resource/content/' + addNodeStructureDto.configPath).endsWith('_catalog.json')
        ) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.structureService.addNode(addNodeStructureDto);
    }

    @Post('delNode')
    @StructureW()
    delNode(@Body() delNodeStructureDto: DelNodeStructureDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + '/resource/content/',
            DATA_PATH + '/resource/content/' + delNodeStructureDto.configPath
        ) || !path.normalize(DATA_PATH + '/resource/content/' + delNodeStructureDto.configPath).endsWith('_catalog.json')
        ) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.structureService.delNode(delNodeStructureDto);
    }

    @Post('swapNodes')
    @StructureW()
    swapNodes(@Body() swapNodesStructureDto: SwapNodesStructureDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + '/resource/content/',
            DATA_PATH + '/resource/content/' + swapNodesStructureDto.configPath
        ) || !path.normalize(DATA_PATH + '/resource/content/' + swapNodesStructureDto.configPath).endsWith('_catalog.json')
        ) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.structureService.swapNodes(swapNodesStructureDto);
    }

    @Post('updateNode')
    @StructureW()
    updateNode(@Body() updateNodeStructureDto: UpdateNodeStructureDto){
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + '/resource/content/',
            DATA_PATH + '/resource/content/' + updateNodeStructureDto.configPath
        ) || !path.normalize(DATA_PATH + '/resource/content/' + updateNodeStructureDto.configPath).endsWith('_catalog.json')
        ) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.structureService.updateNode(updateNodeStructureDto);
    }

    @Get('getTags')
    @Public()
    getTags() {
        return this.structureService.getTags();
    }

    @Post('addTag')
    @StructureW()
    addTag(@Body() addTagStructureDto: AddTagStructureDto) {
        return this.structureService.addTag(addTagStructureDto);
    }

    @Post('delTag')
    @StructureW()
    delTag(@Body() delTagStructureDto: DelTagStructureDto) {
        return this.structureService.delTag(delTagStructureDto);
    }

    @Post('swapTags')
    @StructureW()
    swapTags(@Body() swapTagsStructureDto: SwapTagsStructureDto) {
        return this.structureService.swapTags(swapTagsStructureDto);
    }

    @Post('updateTag')
    @StructureW()
    updateTag(@Body() updateTagStructureDto: UpdateTagStructureDto) {
        return this.structureService.updateTag(updateTagStructureDto);
    }

    @Post('getNodesByTag')
    getNodesByTag(@Body() getNodesByTagSructureDto: GetNodesByTagStructureDto){
        return this.structureService.getNodesByTag(getNodesByTagSructureDto);
    }
}