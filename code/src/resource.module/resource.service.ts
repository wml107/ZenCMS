import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GetResourceDto } from "./dto/get.resource";
import pkgJson from "../../package.json";
import { ListResourceDto } from "./dto/list.resource";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, unlinkSync, writeFileSync } from "fs";
import { CreateFileResourceDto } from "./dto/createFile.resource";
import { CreateCatalogResourceDto } from "./dto/createCatalog.resource";
import { UpdateResourceDto } from "./dto/update.resource";
import { RenameResourceDto } from "./dto/rename.resource";
import path, { normalize } from "path";
import { DeleteResourceDto } from "./dto/delete.resource";
import { RecoveryResourceDto } from "./dto/recovery.resource";
import { CopyResourceDto } from "./dto/copy.resource";
import { CutResourceDto } from "./dto/cut.resource";
import { UploadResourceDto } from "./dto/upload.resource";
import { ImportResourceDto } from "./dto/import.resource";
import { ResponseCode, generateResponse } from "src/utils/Response";
const compressing = require('compressing');
const fs = require('fs');
//文件监听我看网上都推荐chokidar，但这个库并不好用，你们可以去试试能不能复现我的错误：
//        Windows10环境开启监听，连着创建三四层嵌套文件夹，然后在最深的那层创建文件。创建好之后删除最外层的目录，会报错无法删除/文件整被占用。
//        除此之外，绑定监听的时候，他会把你指定目录的所有东西都一个个读取，每读取一条都会执行一遍回调，回调会被反复执行。
const watch = require('node-watch');


@Injectable()
export class ResourceService {

  constructor() {
    //执行资源初始化，检查必要资源是否存在，将需要缓存地数据缓存起来(避免频繁读文件)。
    //检测目录完整性
    ResourceService.initDirectory();

    //将一些数据载入内存进行缓存；并对缓存对应数据监听当数据发生变动时，更新缓存。
    console.log('----------加载htmlPlugin缓存----------');
    ResourceService.updateHtmlPluginCache();
    watch(pkgJson.dataPath + "/resource/htmlPlugin", { recursive: true },
      (event, name) => {
        ResourceService.updateHtmlPluginCache();
      });
    console.log('--------htmlPlugin缓存加载成功--------');

  }


  private static htmlPluginList: { name: string, content: string }[] = [];

  get(getResourceDto: GetResourceDto) {
    switch (getResourceDto.resourceType) {
      case 'content':
        try {
          const content = fs.readFileSync(pkgJson.dataPath + '/resource/content/' + getResourceDto.path);
          this.viewContent(pkgJson.dataPath + '/resource/content/' + getResourceDto.path);
          return generateResponse(ResponseCode.OK, "", content);
        } catch (err) {
          switch (err.errno) {
            case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
          }
          throw err;
        }
    }
  }

  list(listResourceDto: ListResourceDto) {
    try {
      if (listResourceDto.resourceType === 'bin') {
        const dir = JSON.parse(readFileSync(pkgJson.dataPath + "/bin/" + listResourceDto.binType + "/_catalog.json", "utf-8")).list;
        return generateResponse(ResponseCode.OK, "", dir);
      } else if (listResourceDto.resourceType === 'htmlPlugin') {
        return generateResponse(ResponseCode.OK, "", ResourceService.htmlPluginList);
      } else {
        const dir = fs.readdirSync(pkgJson.dataPath + '/resource/' + listResourceDto.resourceType + '/' + listResourceDto.path, 'utf-8');
        return generateResponse(ResponseCode.OK, "", dir);
      }
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }
  }

  upload(file: Express.Multer.File[], uploadResourceDto: UploadResourceDto) {
    //上传或以覆盖更新文件
    try {
      if (uploadResourceDto.resourceType === "htmlPlugin") {
        file.forEach(
          item => writeFileSync(pkgJson.dataPath + '/resource/htmlPlugin/' + item.originalname, item.buffer)
        )
      } else {
        file.forEach(
          item => writeFileSync(pkgJson.dataPath + '/resource/' + uploadResourceDto.resourceType + "/" + uploadResourceDto.path + "/" + item.originalname, item.buffer)
        )
      }
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }

    return generateResponse(ResponseCode.OK, "", null);
  }

  createFile(createFileResourceDto: CreateFileResourceDto) {
    //检查同名文件是否存在，因为请求的发送方可能出于各种问题不知道已经有该名称文件了，这时候需要用类似的名字创建文件并告知请求方。
    let fileName = createFileResourceDto.fileName;
    let nameChanged = false;
    while (existsSync(pkgJson.dataPath + "/resource/content/" + createFileResourceDto.path + fileName + '.' + createFileResourceDto.fileType)) {
      nameChanged = true;
      fileName += '(1)';
    }
    //创建文件
    try {
      writeFileSync(pkgJson.dataPath + "/resource/content/" + createFileResourceDto.path + fileName + '.' + createFileResourceDto.fileType,
        createFileResourceDto.content);
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }
    //返回
    if (nameChanged) return generateResponse(ResponseCode.EXISTED_NAME_SUCC,
      'name already exists，save as ' + fileName + '.' + createFileResourceDto.fileType + '.',
      fileName + '.' + createFileResourceDto.fileType);
    return generateResponse(ResponseCode.OK, "", null);
  }

  createCatalog(createCatalogResourceDto: CreateCatalogResourceDto) {
    //检查同名文件加是否存在，因为请求的发送方可能出于各种问题不知道已经有该名称文件夹了，这时候需要用类似的名字创建文件夹子并告知请求方。
    let catalogName = createCatalogResourceDto.catalogName;
    let nameChanged = false;
    while (existsSync(pkgJson.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + catalogName)) {
      nameChanged = true;
      catalogName += '(1)';
    }
    //创建文件
    try {
      mkdirSync(pkgJson.dataPath + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + catalogName);
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }
    //返回
    if (nameChanged) return generateResponse(ResponseCode.EXISTED_NAME_SUCC,
      'name already exists，save as ' + catalogName + '.',
      catalogName);
    return generateResponse(ResponseCode.OK, "", null);
  }

  update(updateResourceDto: UpdateResourceDto) {
    //检查同名文件是否存在，因为请求的发送方可能出于各种问题不知道已经没有该文件了，这时候需要以这个路径新建并告知请求方。
    let fileExist = true;
    if (!existsSync(pkgJson.dataPath + "/resource/content/" + updateResourceDto.path)) fileExist = false;

    //更新文件
    try {
      writeFileSync(pkgJson.dataPath + "/resource/content/" + updateResourceDto.path,
        updateResourceDto.content);
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
        case -4068: throw new HttpException("path should not be a directory",ResponseCode.NEED_FILE);
      }
      throw err;
    }

    //返回
    if (!fileExist) throw new HttpException("no such file, and new file were created according to the path and content", ResponseCode.NO_SUCH_FILE_BUT_CREATE);
    return generateResponse(ResponseCode.OK, "", null);
  }

  rename(renameResourceDto: RenameResourceDto) {
    try {
      renameSync(pkgJson.dataPath + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path,
        pkgJson.dataPath + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path + '/../' + renameResourceDto.newName);
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
        case -4048: throw new HttpException("name already exist", ResponseCode.EXISTED_NAME_FAIL);
      }
      throw err;
    }

    return 'succ';
  }

  copy(copyResourceDto: CopyResourceDto) {
    //检查同名文件是否存在，因为请求的发送方可能出于各种问题不知道已经有该名称文件了，这时候需要用类似的名字创建文件并告知请求方。
    let fileName = path.basename(copyResourceDto.newPath);
    let nameChanged = false;
    while (existsSync(pkgJson.dataPath + "/resource/" + copyResourceDto.newPath + "/../" + fileName)) {
      nameChanged = true;
      fileName = "(1)" + fileName;
    }

    try {
      cpSync(pkgJson.dataPath + "/resource/" + copyResourceDto.oldPath,
        pkgJson.dataPath + "/resource/" + copyResourceDto.newPath + "/../" + fileName, {
        errorOnExist: true,
        force: false,
        mode: fs.constants.COPYFILE_EXCL,
        recursive: true
      });
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }

    //返回
    if (nameChanged) return generateResponse(ResponseCode.EXISTED_NAME_SUCC,
      'name already exists，save as ' + fileName + '.',
      fileName);
    return generateResponse(ResponseCode.OK, "", null);
  }

  cut(cutResourceDto: CutResourceDto) {
    //检查同名文件是否存在，因为请求的发送方可能出于各种问题不知道已经有该名称文件了，这时候需要用类似的名字创建文件并告知请求方。
    let fileName = path.basename(cutResourceDto.newPath);
    let nameChanged = false;
    while (existsSync(pkgJson.dataPath + "/resource/" + cutResourceDto.newPath + "/../" + fileName)) {
      nameChanged = true;
      fileName = "(1)" + fileName;
    }

    try {
      renameSync(pkgJson.dataPath + "/resource/" + cutResourceDto.oldPath,
        pkgJson.dataPath + "/resource/" + cutResourceDto.newPath + "/../" + fileName);
    } catch (err) {
      switch (err.errno) {
        case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }

    //返回
    if (nameChanged) return generateResponse(ResponseCode.EXISTED_NAME_SUCC,
      'name already exists，save as ' + fileName + '.',
      fileName);
    return generateResponse(ResponseCode.OK, "", null);
  }

  delete(deleteResourceDto: DeleteResourceDto) {
    //存在问题：删除操作有两步，移动/删除文件、更改配置文件，但无法使两者同步，先执行的操作无法保证后执行的操作一定成功，若后执行的操作失败，没有一个可靠的方法撤回先执行的操作。虽然这样的可能很小，但系统确实有可能发生这样的意外。

    let binList = JSON.parse(readFileSync(pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", "utf-8"));

    if (deleteResourceDto.type === 'permanent') {
      try {
        rmSync(pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path, {
          recursive: true
        });

        binList.list = binList.list.filter(item => item.name !== deleteResourceDto.path);
        writeFileSync(pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
      } catch (err) {
        switch (err.errno) {
          case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
        }
        throw err;
      }
    } else {
      //检查同名文件加是否存在，回收站有可能已经存在同名文件，这样一来文件系统就存不进去，或者把原来的文件覆盖，所以需要检查一下，如果存在这种情况，要起个别名并在json中标注。
      let fileName = path.basename(deleteResourceDto.path);
      while (existsSync(pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + fileName)) fileName = '(1)' + fileName;

      try {
        renameSync(pkgJson.dataPath + "/resource/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path,
          pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/" + fileName
        );

        binList.list.push({
          "name": fileName,
          "originPath": deleteResourceDto.resourceType + "/" + deleteResourceDto.path,
          "date": Date.now()
        });
        writeFileSync(pkgJson.dataPath + "/bin/" + deleteResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
      } catch (err) {
        switch (err.errno) {
          case -4058: throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
        }
        throw err;
      }
    }

    return generateResponse(ResponseCode.OK, "", null);
  }

  recovery(recoveryResourceDto: RecoveryResourceDto) {
    //存在问题：恢复操作有两步，移动文件、更改配置文件，但无法使两者同步，先执行的操作无法保证后执行的操作一定成功，若后执行的操作失败，没有一个可靠的方法撤回先执行的操作。虽然这样的可能很小，但系统确实有可能发生这样的意外。

    //检查读取配置文件
    let binList = JSON.parse(readFileSync(pkgJson.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", "utf-8"));
    let fileInfo = binList.list.find(item => item.name === recoveryResourceDto.fileName);
    let configExist = true;
    let originName, originPath;
    if (fileInfo === undefined) {
      configExist = false;
      originName = recoveryResourceDto.fileName;
      originPath = recoveryResourceDto.resourceType + "/" + originName
    } else {
      originName = path.basename(fileInfo.originPath);
      originPath = fileInfo.originPath;
    }
    //检查原位置是否已经存在同名文件，要是存在需起个别名恢复并通知请求方。
    let nameChanged = false;
    while (existsSync(pkgJson.dataPath + "/resource/" + originPath + "/../" + originName)) {
      originName = "(1)" + originName;
      nameChanged = true;
    }
    //移回原位
    try {
      renameSync(pkgJson.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/" + recoveryResourceDto.fileName,
        pkgJson.dataPath + "/resource/" + originPath + "/../" + originName
      );

      binList.list = binList.list.filter(item => item.name !== recoveryResourceDto.fileName);
      writeFileSync(pkgJson.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
    } catch (err) {
      switch (err.errno) {
        case -4058:
          //回收站都不存在这个文件，何谈配置文件，要把相应记录清除
          if (!configExist) {
            binList.list = binList.list.filter(item => item.name !== recoveryResourceDto.fileName);
            writeFileSync(pkgJson.dataPath + "/bin/" + recoveryResourceDto.resourceType + "/_catalog.json", JSON.stringify(binList));
          }
          throw new HttpException("path does not exist", ResponseCode.BAD_PATH);
      }
      throw err;
    }

    if (!configExist) generateResponse(ResponseCode.BAD_PATH_RECOVERY,
      "An unexpected error occurred in the configuration file, the source path could not be read and the file was restored to the root directory of the corresponding resource.",
      null);
    if (nameChanged) generateResponse(ResponseCode.EXISTED_NAME_SUCC,
      'name already exists，save as ' + originName + '.',
      originName);
    return generateResponse(ResponseCode.OK, "", null);
  }

  async import(data: Express.Multer.File, importResourceDto: ImportResourceDto) {
    await compressing.zip.uncompress(data.buffer, importResourceDto.targetPath === "" ? pkgJson.dataPath + "/../" : importResourceDto.targetPath);
    if (importResourceDto.targetPath !== "") {
      pkgJson.dataPath = normalize(importResourceDto.targetPath + "/data");
      writeFileSync(normalize(__dirname + "/../../../package.json"), JSON.stringify(pkgJson));
    }
    return generateResponse(ResponseCode.OK, "", null);
  }

  private viewContent(contentPath: string): void {
    let configPath = contentPath + "/../_catalog.json";
    let contentName = path.basename(contentPath);
    try {
      let catalogFile = JSON.parse(readFileSync(configPath, 'utf-8'));
      catalogFile.catalog.forEach((item, index) => {
        if (item.path === contentName) {
          catalogFile.catalog[index].views += 1;
          index = catalogFile.catalog.length;
        }
      });
      writeFileSync(configPath, JSON.stringify(catalogFile));
    } catch (err) { }
  }

  //初始化资源目录
  static initDirectory() {
    //检查资源目录
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
    ]
    console.log('----------数据目录完整性检测----------');
    if (!existsSync(pkgJson.dataPath)) {
      console.log('数据目录不可达，在和网站目录同级的位置将创建新目录data，原路径已被该目录路径替换。');
      pkgJson.dataPath = path.normalize(__dirname + '../../../../../data');
      if (!existsSync(pkgJson.dataPath)) mkdirSync(pkgJson.dataPath);
      if (!statSync(pkgJson.dataPath).isDirectory()) {
        const choice = require('readline-sync').question('检测到data目录所在位置被名为data的文件占用，是否删除该文件以创建data目录(Y/N)？');
        if (choice === 'y' || choice === 'Y') {
          unlinkSync(pkgJson.dataPath);
          mkdirSync(pkgJson.dataPath);
        }
      }
      writeFileSync(__dirname + '../../../../package.json', JSON.stringify(pkgJson));
      //理论上代码走到这个位置会自动重启的，因为程序的源文件发生了改动，会触发热更新，但以防万一，这里还是进行 一下提示并手动退出。
      console.log("应用已关闭，请重启应用。");
      process.exit(0);
    }
    if (!statSync(pkgJson.dataPath).isDirectory()) {
      const choice = require('readline-sync').question('所设置的数据目录路径被同名文件占用，是否删除该文件以创建目录(Y/N)？');
      if (choice === 'y' || choice === 'Y') {
        unlinkSync(pkgJson.dataPath);
        mkdirSync(pkgJson.dataPath);
      }
      console.log("应用已关闭，请重启应用。");
      process.exit(0);
    }

    for (let i = 0; i < DirectoryNeedCheck.length; i++) {
      if (!existsSync(pkgJson.dataPath + DirectoryNeedCheck[i])) {
        console.log('目录' + DirectoryNeedCheck[i] + '不可达，执行创建。');
        mkdirSync(pkgJson.dataPath + DirectoryNeedCheck[i]);
      }
      if (!statSync(pkgJson.dataPath + DirectoryNeedCheck[i]).isDirectory()) {
        console.log('目录' + DirectoryNeedCheck[i] + '所在位置被同名文件占用，执行对该同名文件删除并创建目录。');
        unlinkSync(pkgJson.dataPath + DirectoryNeedCheck[i]);
        mkdirSync(pkgJson.dataPath + DirectoryNeedCheck[i]);
      }
    }

    for (let i = 0; i < FileNeedCheck.length; i++) {
      if (!existsSync(pkgJson.dataPath + FileNeedCheck[i].filePath)) {
        console.log('文件' + FileNeedCheck[i].filePath + '不可达，执行创建。');
        writeFileSync(pkgJson.dataPath + FileNeedCheck[i].filePath, FileNeedCheck[i].initContent);
      }
      if (!statSync(pkgJson.dataPath + FileNeedCheck[i].filePath).isFile()) {
        console.log('文件' + FileNeedCheck[i].filePath + '所在位置被同名目录占用，执行对该同名目录删除并创建文件。');
        rmSync(pkgJson.dataPath + FileNeedCheck[i].filePath, { recursive: true });
        writeFileSync(pkgJson.dataPath + FileNeedCheck[i].filePath, FileNeedCheck[i].initContent);
      }
    }
    console.log('------------数据目录完整√-------------');
  }

  //更新缓存中的html插件列表 
  static updateHtmlPluginCache(): boolean {
    try {
      const htmlPluginFileList = readdirSync(pkgJson.dataPath + "/resource/htmlPlugin");

      for (let i = 0; i < htmlPluginFileList.length; i++) {
        //跳过是目录的情形，以防某些意外导致系统报错停止运行。
        if (statSync(pkgJson.dataPath + "/resource/htmlPlugin/" + htmlPluginFileList[i]).isDirectory()) continue;

        this.htmlPluginList.push({
          name: path.parse(htmlPluginFileList[i]).name,
          content: fs.readFileSync(pkgJson.dataPath + "/resource/htmlPlugin/" + htmlPluginFileList[i], 'utf-8')
        });
      }
    } catch (err) {
      console.log(err);
      throw Error("html plugins cache update failure");
    }
    return true;
  }
}
