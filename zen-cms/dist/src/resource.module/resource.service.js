"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ResourceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const package_json_1 = __importDefault(require("../../package.json"));
const fs_1 = require("fs");
const path_1 = __importStar(require("path"));
const Response_1 = require("../utils/Response");
const compressing = require('compressing');
const fs = require('fs');
const watch = require('node-watch');
let ResourceService = ResourceService_1 = class ResourceService {
    constructor() {
        ResourceService_1.initDirectory();
        console.log('----------加载htmlPlugin缓存----------');
        ResourceService_1.updateHtmlPluginCache();
        watch(package_json_1.default.dataPath + "/resource/htmlPlugin", { recursive: true }, (event, name) => {
            ResourceService_1.updateHtmlPluginCache();
        });
        console.log('--------htmlPlugin缓存加载成功--------');
    }
    get(getResourceDto) {
        switch (getResourceDto.resourceType) {
            case 'content':
                try {
                    const content = fs.readFileSync(package_json_1.default.dataPath + '/resource/content/' + getResourceDto.path);
                    this.viewContent(package_json_1.default.dataPath + '/resource/content/' + getResourceDto.path);
                    return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", content);
                }
                catch (err) {
                    switch (err.errno) {
                        case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
                    }
                    throw err;
                }
        }
    }
    list(listResourceDto) {
        try {
            if (listResourceDto.resourceType === 'bin') {
                const dir = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/bin/" + listResourceDto.binType + "/_catalog.json", "utf-8")).list;
                return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", dir);
            }
            else if (listResourceDto.resourceType === 'htmlPlugin') {
                return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", ResourceService_1.htmlPluginList);
            }
            else {
                const dir = fs.readdirSync(package_json_1.default.dataPath + '/resource/' + listResourceDto.resourceType + '/' + listResourceDto.path, 'utf-8');
                return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", dir);
            }
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
    }
    upload(file, uploadResourceDto) {
        try {
            if (uploadResourceDto.resourceType === "htmlPlugin") {
                file.forEach(item => (0, fs_1.writeFileSync)(package_json_1.default.dataPath + '/resource/htmlPlugin/' + item.originalname, item.buffer));
            }
            else {
                file.forEach(item => (0, fs_1.writeFileSync)(package_json_1.default.dataPath + '/resource/' + uploadResourceDto.resourceType + "/" + uploadResourceDto.path + "/" + item.originalname, item.buffer));
            }
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    createFile(createFileResourceDto) {
        let fileName = createFileResourceDto.fileName;
        let nameChanged = false;
        while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/content/" + createFileResourceDto.path + fileName + '.' + createFileResourceDto.fileType)) {
            nameChanged = true;
            fileName += '(1)';
        }
        try {
            (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + createFileResourceDto.path + fileName + '.' + createFileResourceDto.fileType, createFileResourceDto.content);
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        if (nameChanged)
            return (0, Response_1.generateResponse)(Response_1.ResponseCode.EXISTED_NAME_SUCC, 'name already exists，save as ' + fileName + '.' + createFileResourceDto.fileType + '.', fileName + '.' + createFileResourceDto.fileType);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    createCatalog(createCatalogResourceDto) {
        let catalogName = createCatalogResourceDto.catalogName;
        let nameChanged = false;
        while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + catalogName)) {
            nameChanged = true;
            catalogName += '(1)';
        }
        try {
            (0, fs_1.mkdirSync)(package_json_1.default.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + catalogName);
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        if (nameChanged)
            return (0, Response_1.generateResponse)(Response_1.ResponseCode.EXISTED_NAME_SUCC, 'name already exists，save as ' + catalogName + '.', catalogName);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    update(updateResourceDto) {
        let fileExist = true;
        if (!(0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/content/" + updateResourceDto.path))
            fileExist = false;
        try {
            (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/resource/content/" + updateResourceDto.path, updateResourceDto.content);
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
                case -4068: throw new common_1.HttpException("path should not be a directory", Response_1.ResponseCode.NEED_FILE);
            }
            throw err;
        }
        if (!fileExist)
            throw new common_1.HttpException("no such file, and new file were created according to the path and content", Response_1.ResponseCode.NO_SUCH_FILE_BUT_CREATE);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    rename(renameResourceDto) {
        try {
            (0, fs_1.renameSync)(package_json_1.default.dataPath + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path, package_json_1.default.dataPath + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path + '/../' + renameResourceDto.newName);
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
                case -4048: throw new common_1.HttpException("name already exist", Response_1.ResponseCode.EXISTED_NAME_FAIL);
            }
            throw err;
        }
        return 'succ';
    }
    copy(copyResourceDto) {
        let fileName = path_1.default.basename(copyResourceDto.newPath);
        let nameChanged = false;
        while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/" + copyResourceDto.newPath + "/../" + fileName)) {
            nameChanged = true;
            fileName = "(1)" + fileName;
        }
        try {
            (0, fs_1.cpSync)(package_json_1.default.dataPath + "/resource/" + copyResourceDto.oldPath, package_json_1.default.dataPath + "/resource/" + copyResourceDto.newPath + "/../" + fileName, {
                errorOnExist: true,
                force: false,
                mode: fs.constants.COPYFILE_EXCL,
                recursive: true
            });
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        if (nameChanged)
            return (0, Response_1.generateResponse)(Response_1.ResponseCode.EXISTED_NAME_SUCC, 'name already exists，save as ' + fileName + '.', fileName);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    cut(cutResourceDto) {
        let fileName = path_1.default.basename(cutResourceDto.newPath);
        let nameChanged = false;
        while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/" + cutResourceDto.newPath + "/../" + fileName)) {
            nameChanged = true;
            fileName = "(1)" + fileName;
        }
        try {
            (0, fs_1.renameSync)(package_json_1.default.dataPath + "/resource/" + cutResourceDto.oldPath, package_json_1.default.dataPath + "/resource/" + cutResourceDto.newPath + "/../" + fileName);
        }
        catch (err) {
            switch (err.errno) {
                case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        if (nameChanged)
            return (0, Response_1.generateResponse)(Response_1.ResponseCode.EXISTED_NAME_SUCC, 'name already exists，save as ' + fileName + '.', fileName);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    delete(deleteResourceDto) {
        let binList = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", "utf-8"));
        if (deleteResourceDto.type === 'permanent') {
            try {
                (0, fs_1.rmSync)(package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path, {
                    recursive: true
                });
                binList.list = binList.list.filter(item => item.name !== deleteResourceDto.path);
                (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
            }
            catch (err) {
                switch (err.errno) {
                    case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
                }
                throw err;
            }
        }
        else {
            let fileName = path_1.default.basename(deleteResourceDto.path);
            while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + fileName))
                fileName = '(1)' + fileName;
            try {
                (0, fs_1.renameSync)(package_json_1.default.dataPath + "/resource/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path, package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + fileName);
                binList.list.push({
                    "name": fileName,
                    "originPath": deleteResourceDto.resourceType + "/" + deleteResourceDto.path,
                    "date": Date.now()
                });
                (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
            }
            catch (err) {
                switch (err.errno) {
                    case -4058: throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
                }
                throw err;
            }
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    recovery(recoveryResourceDto) {
        let binList = JSON.parse((0, fs_1.readFileSync)(package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", "utf-8"));
        let fileInfo = binList.list.find(item => item.name === recoveryResourceDto.fileName);
        let configExist = true;
        let originName, originPath;
        if (fileInfo === undefined) {
            configExist = false;
            originName = recoveryResourceDto.fileName;
            originPath = recoveryResourceDto.resourceType + "/" + originName;
        }
        else {
            originName = path_1.default.basename(fileInfo.originPath);
            originPath = fileInfo.originPath;
        }
        let nameChanged = false;
        while ((0, fs_1.existsSync)(package_json_1.default.dataPath + "/resource/" + originPath + "/../" + originName)) {
            originName = "(1)" + originName;
            nameChanged = true;
        }
        try {
            (0, fs_1.renameSync)(package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/" + recoveryResourceDto.fileName, package_json_1.default.dataPath + "/resource/" + originPath + "/../" + originName);
            binList.list = binList.list.filter(item => item.name !== recoveryResourceDto.fileName);
            (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
        }
        catch (err) {
            switch (err.errno) {
                case -4058:
                    if (!configExist) {
                        binList.list = binList.list.filter(item => item.name !== recoveryResourceDto.fileName);
                        (0, fs_1.writeFileSync)(package_json_1.default.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
                    }
                    throw new common_1.HttpException("path does not exist", Response_1.ResponseCode.BAD_PATH);
            }
            throw err;
        }
        if (!configExist)
            (0, Response_1.generateResponse)(Response_1.ResponseCode.BAD_PATH_RECOVERY, "An unexpected error occurred in the configuration file, the source path could not be read and the file was restored to the root directory of the corresponding resource.", null);
        if (nameChanged)
            (0, Response_1.generateResponse)(Response_1.ResponseCode.EXISTED_NAME_SUCC, 'name already exists，save as ' + originName + '.', originName);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async import(data, importResourceDto) {
        await compressing.zip.uncompress(data.buffer, importResourceDto.targetPath === "" ? package_json_1.default.dataPath + "/../" : importResourceDto.targetPath);
        if (importResourceDto.targetPath !== "") {
            package_json_1.default.dataPath = (0, path_1.normalize)(importResourceDto.targetPath + "/data");
            (0, fs_1.writeFileSync)((0, path_1.normalize)(__dirname + "/../../../package.json"), JSON.stringify(package_json_1.default));
        }
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    viewContent(contentPath) {
        let configPath = contentPath + "/../_catalog.json";
        let contentName = path_1.default.basename(contentPath);
        try {
            let catalogFile = JSON.parse((0, fs_1.readFileSync)(configPath, 'utf-8'));
            catalogFile.catalog.forEach((item, index) => {
                if (item.path === contentName) {
                    catalogFile.catalog[index].views += 1;
                    index = catalogFile.catalog.length;
                }
            });
            (0, fs_1.writeFileSync)(configPath, JSON.stringify(catalogFile));
        }
        catch (err) { }
    }
    static initDirectory() {
        const DirectoryNeedCheck = [
            '/resource',
            '/resource/content',
            '/resource/htmlPlugin',
            '/resource/pic',
            '/resource/file',
            '/bin',
            '/bin/content',
            '/bin/htmlPlugin',
            '/bin/pic',
            '/bin/file',
            '/site'
        ];
        const FileNeedCheck = [
            {
                filePath: '/bin/content/_catalog.json',
                initContent: '{"list": []}'
            }, {
                filePath: '/bin/htmlPlugin/_catalog.json',
                initContent: '{"list": []}'
            }, {
                filePath: '/bin/pic/_catalog.json',
                initContent: '{"list": []}'
            }, {
                filePath: '/bin/file/_catalog.json',
                initContent: '{"list": []}'
            }, {
                filePath: '/site/site.json',
                initContent: '{}'
            },
        ];
        console.log('----------数据目录完整性检测----------');
        if (!(0, fs_1.existsSync)(package_json_1.default.dataPath)) {
            console.log('数据目录不可达，在和网站目录同级的位置将创建新目录data，原路径已被该目录路径替换。');
            package_json_1.default.dataPath = path_1.default.normalize(__dirname + '../../../../../data');
            if (!(0, fs_1.existsSync)(package_json_1.default.dataPath))
                (0, fs_1.mkdirSync)(package_json_1.default.dataPath);
            if (!(0, fs_1.statSync)(package_json_1.default.dataPath).isDirectory()) {
                const choice = require('readline-sync').question('检测到data目录所在位置被名为data的文件占用，是否删除该文件以创建data目录(Y/N)？');
                if (choice === 'y' || choice === 'Y') {
                    (0, fs_1.unlinkSync)(package_json_1.default.dataPath);
                    (0, fs_1.mkdirSync)(package_json_1.default.dataPath);
                }
            }
            (0, fs_1.writeFileSync)(__dirname + '../../../../package.json', JSON.stringify(package_json_1.default));
            console.log("应用已关闭，请重启应用。");
            process.exit(0);
        }
        if (!(0, fs_1.statSync)(package_json_1.default.dataPath).isDirectory()) {
            const choice = require('readline-sync').question('所设置的数据目录路径被同名文件占用，是否删除该文件以创建目录(Y/N)？');
            if (choice === 'y' || choice === 'Y') {
                (0, fs_1.unlinkSync)(package_json_1.default.dataPath);
                (0, fs_1.mkdirSync)(package_json_1.default.dataPath);
            }
            console.log("应用已关闭，请重启应用。");
            process.exit(0);
        }
        for (let i = 0; i < DirectoryNeedCheck.length; i++) {
            if (!(0, fs_1.existsSync)(package_json_1.default.dataPath + DirectoryNeedCheck[i])) {
                console.log('目录' + DirectoryNeedCheck[i] + '不可达，执行创建。');
                (0, fs_1.mkdirSync)(package_json_1.default.dataPath + DirectoryNeedCheck[i]);
            }
            if (!(0, fs_1.statSync)(package_json_1.default.dataPath + DirectoryNeedCheck[i]).isDirectory()) {
                console.log('目录' + DirectoryNeedCheck[i] + '所在位置被同名文件占用，执行对该同名文件删除并创建目录。');
                (0, fs_1.unlinkSync)(package_json_1.default.dataPath + DirectoryNeedCheck[i]);
                (0, fs_1.mkdirSync)(package_json_1.default.dataPath + DirectoryNeedCheck[i]);
            }
        }
        for (let i = 0; i < FileNeedCheck.length; i++) {
            if (!(0, fs_1.existsSync)(package_json_1.default.dataPath + FileNeedCheck[i].filePath)) {
                console.log('文件' + FileNeedCheck[i].filePath + '不可达，执行创建。');
                (0, fs_1.writeFileSync)(package_json_1.default.dataPath + FileNeedCheck[i].filePath, FileNeedCheck[i].initContent);
            }
            if (!(0, fs_1.statSync)(package_json_1.default.dataPath + FileNeedCheck[i].filePath).isFile()) {
                console.log('文件' + FileNeedCheck[i].filePath + '所在位置被同名目录占用，执行对该同名目录删除并创建文件。');
                (0, fs_1.rmSync)(package_json_1.default.dataPath + FileNeedCheck[i].filePath, { recursive: true });
                (0, fs_1.writeFileSync)(package_json_1.default.dataPath + FileNeedCheck[i].filePath, FileNeedCheck[i].initContent);
            }
        }
        console.log('------------数据目录完整√-------------');
    }
    static updateHtmlPluginCache() {
        try {
            const htmlPluginFileList = (0, fs_1.readdirSync)(package_json_1.default.dataPath + "/resource/htmlPlugin");
            for (let i = 0; i < htmlPluginFileList.length; i++) {
                if ((0, fs_1.statSync)(package_json_1.default.dataPath + "/resource/htmlPlugin/" + htmlPluginFileList[i]).isDirectory())
                    continue;
                this.htmlPluginList.push({
                    name: path_1.default.parse(htmlPluginFileList[i]).name,
                    content: fs.readFileSync(package_json_1.default.dataPath + "/resource/htmlPlugin/" + htmlPluginFileList[i], 'utf-8')
                });
            }
        }
        catch (err) {
            console.log(err);
            throw Error("html plugins cache update failure");
        }
        return true;
    }
};
exports.ResourceService = ResourceService;
ResourceService.htmlPluginList = [];
exports.ResourceService = ResourceService = ResourceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResourceService);
//# sourceMappingURL=resource.service.js.map