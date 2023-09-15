import { StructureService } from "./structure.service";
import { AddTagStructureDto } from "./dto/addTag.structure";
import { DelTagStructureDto } from "./dto/delTag.structure";
import { SwapTagsStructureDto } from "./dto/swapTags.structure";
import { UpdateTagStructureDto } from "./dto/updateTag.structure";
import { AddNodeStructureDto } from "./dto/addNode.structure";
import { DelNodeStructureDto } from "./dto/delNode.structure";
import { SwapNodesStructureDto } from "./dto/swapNodes.structure";
import { UpdateNodeStructureDto } from "./dto/updateNode.structure";
import { GetNodesByTagStructureDto } from "./dto/getNodesByTag";
export declare class StructureController {
    private structureService;
    constructor(structureService: StructureService);
    getTree(): {
        statusCode: any;
        message: any;
        data: any;
    };
    addNode(addNodeStructureDto: AddNodeStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    delNode(delNodeStructureDto: DelNodeStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    swapNodes(swapNodesStructureDto: SwapNodesStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    updateNode(updateNodeStructureDto: UpdateNodeStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    getTags(): {
        statusCode: any;
        message: any;
        data: any;
    };
    addTag(addTagStructureDto: AddTagStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    } | "同名标签已经存在。";
    delTag(delTagStructureDto: DelTagStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    swapTags(swapTagsStructureDto: SwapTagsStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    updateTag(updateTagStructureDto: UpdateTagStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    getNodesByTag(getNodesByTagSructureDto: GetNodesByTagStructureDto): {
        statusCode: any;
        message: any;
        data: any;
    };
}
