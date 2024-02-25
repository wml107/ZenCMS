import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { GetResourceDto } from './dto/get.resource';
import { ListResourceDto } from './dto/list.resource';
import { DownloadResourceDto } from './dto/download.resource';
import { Response } from 'express';
import { existsSync, rmSync, statSync } from 'fs';
import { pathAuthorityValidation } from 'src/utils/pathAuthorityValidation';
import { CreateFileResourceDto } from './dto/createFile.resource';
import { CreateCatalogResourceDto } from './dto/createCatalog.resource';
import { UpdateResourceDto } from './dto/update.resource';
import { RenameResourceDto } from './dto/rename.resource';
import { DeleteResourceDto } from './dto/delete.resource';
import { RecoveryResourceDto } from './dto/recovery.resource';
import { CopyResourceDto } from './dto/copy.resource';
import { CutResourceDto } from './dto/cut.resource';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadResourceDto } from './dto/upload.resource';
import { ImportResourceDto } from './dto/import.resource';
import { SiteService } from 'src/site.module/site.service';
import { Public, ResourceR, ResourceW } from 'src/auth/authorization.decorator';
import { ResponseCode, generateResponse } from 'src/utils/Response';
import { generateString } from '@nestjs/typeorm';
import Config from '../utils/Config';

const compressing = require('compressing');

const config = new Config();
const DATA_PATH = config.getConfig('DATA_PATH');

@Controller('resource')
export class ResourceController {
    constructor(private resourceService: ResourceService) { }

    //有一些输入的边界情况，即不会对客户端体验造成影响，也不会造成服务器错误破坏系统。这些情况全都校验效率太低，或让代码臃肿，对于这些情况，我选择忽略或者用简单的无差别转换代替校验。涉及这种情况的地方会有说明。

    @Post('get')
    @Public()
    async get(@Body() getResourceDto: GetResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + '/resource/content/',
            DATA_PATH + '/resource/content/' + getResourceDto.path)
        ) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);
        //没有校验请求的路径到底是文件还是文件夹，但这没有任何影响：请求文件夹返回空，要是不存在文件夹会返回路径无效；客户端是可信的，不会发出这种请求；其他来源的请求也不会对服务端造成任何影响。
        const res = await this.resourceService.get(getResourceDto);
        return generateResponse(ResponseCode.OK, "", res);
    }

    @Post('list')
    @ResourceR()
    async list(@Body() listResourceDto: ListResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (listResourceDto.resourceType !== 'bin' && listResourceDto.resourceType !== 'htmlPlugin' && !pathAuthorityValidation(
            DATA_PATH + '/resource/' + listResourceDto.resourceType + "/",
            DATA_PATH + '/resource/' + listResourceDto.resourceType + '/' + listResourceDto.path,
            true
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);
        //没有校验请求的路径到底是文件还是文件夹，但这没有任何影响：请求文件返回空；客户端是可信的，不会发出这种请求；其他来源的请求也不会对服务端造成任何影响。
        const res = await this.resourceService.list(listResourceDto);
        return generateResponse(ResponseCode.OK, "", res);
    }

    @Post('download')
    @ResourceR()
    download(@Body() downloadResourceDto: DownloadResourceDto, @Res() res: Response) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/" + downloadResourceDto.resourceType + "/",
            DATA_PATH + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);


        //这里这样写是一种权宜之计：通过express的download方法以下载的方式向调用方发送文件。但问题是express的download方法限制颇多：
        //  1.只支持以回调的方式处理错误，try catch是捕获不到异常的.
        //  2.就算是在回调处理错误，他提供的异常对象err，也不是常规的Error对象，而是一些莫名其妙的字符串(name, message, stack)，并且对于不同类型的错误，这个错误对象还大不相同。
        //这就意味着你根本没办法根据错误码来检测错误，错误处理完全不可控，没办法在回调处理。
        //在回调抛出来也是无法实现的，根本抛不出来，经测试发现这种做法没反应。
        //所以就只能尽可能预料到各种错误，然后在调用这个方法之前检查这些情形，至于其他的错误，不做任何处理、不写回调。因为似乎express和nest之间有一种内部的机制，express的这个方法出错，在没有回调的情况下，nest是能检测到的，并且会返回给客户端一个简单的错误信息。

        //判断路径是否存在
        if (!existsSync(DATA_PATH + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path)) throw new HttpException('cannot find resource', HttpStatus.NOT_FOUND);
        //判断是否为目录
        if (statSync(DATA_PATH + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path).isDirectory()) throw new HttpException('cannot download directory', HttpStatus.BAD_REQUEST);

        res.download(DATA_PATH + "/resource/" + downloadResourceDto.resourceType + "/" + downloadResourceDto.path);
    }

    //兼具上传与编辑功能（同名文件会被覆盖内容）
    @Post('upload')
    @ResourceW()
    @UseInterceptors(FilesInterceptor('file'))
    upload(@UploadedFiles() file: Express.Multer.File[], @Body() uploadResourceDto: UploadResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/" + uploadResourceDto.resourceType + "/",
            DATA_PATH + "/resource/" + uploadResourceDto.resourceType + "/" + uploadResourceDto.path
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        if(this.resourceService.upload(file, uploadResourceDto))return generateResponse(ResponseCode.OK, "", null);
    }

    @Post('createFile')
    @ResourceW()
    createFile(@Body() createFileResourceDto: CreateFileResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/content",
            DATA_PATH + "/resource/content/" + createFileResourceDto.path + '/' + createFileResourceDto.fileName + '.' + createFileResourceDto.fileType
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);
        //创建文件的路径应当以"/"结尾，不然路径尾部的名字会进入到文件名的一部分。直接校验过于麻烦，直接在尾部加斜杠即可，因为真正文件操作的时候多余的斜杠都会被忽略。
        createFileResourceDto.path += '/';

        return this.resourceService.createFile(createFileResourceDto);
    }

    @Post('createCatalog')
    @ResourceW()
    createCatalog(@Body() createCatalogResourceDto: CreateCatalogResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/" + createCatalogResourceDto.resourceType + "/",
            DATA_PATH + "/resource/" + createCatalogResourceDto.resourceType + "/" + createCatalogResourceDto.path + '/' + createCatalogResourceDto.catalogName
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);
        //创建文件的路径应当以"/"结尾，不然路径尾部的名字会进入到文件名的一部分。直接校验过于麻烦，直接在尾部加斜杠即可，因为真正文件操作的时候多余的斜杠都会被忽略。
        createCatalogResourceDto.path += '/';

        return this.resourceService.createCatalog(createCatalogResourceDto);
    }

    @Post('update')
    @ResourceW()
    update(@Body() updateResourceDto: UpdateResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/content/",
            DATA_PATH + "/resource/content/" + updateResourceDto.path
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.resourceService.update(updateResourceDto);
    }

    @Post('rename')
    @ResourceW()
    rename(@Body() renameResourceDto: RenameResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/resource/" + renameResourceDto.resourceType + "/",
            DATA_PATH + "/resource/" + renameResourceDto.resourceType + "/" + renameResourceDto.path
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        if(this.resourceService.rename(renameResourceDto))return generateResponse(ResponseCode.OK, "", null);
    }

    @Post('copy')
    @ResourceW()
    copy(@Body() copyResourceDto: CopyResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        const resourceType = ['content/', 'htmlPlugin/', 'pic/', 'file/']
        let isOldPathValid = false;
        let isNewPathValid = false;
        for (let i = 0; i < resourceType.length; i++) if (pathAuthorityValidation(DATA_PATH + "/resource/" + resourceType[i], DATA_PATH + "/resource/" + copyResourceDto.oldPath)) isOldPathValid = true;
        for (let i = 0; i < resourceType.length; i++) if (pathAuthorityValidation(DATA_PATH + "/resource/" + resourceType[i], DATA_PATH + "/resource/" + copyResourceDto.newPath)) isNewPathValid = true;
        if (!isOldPathValid || !isNewPathValid)  throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.resourceService.copy(copyResourceDto);
    }

    @Post('cut')
    @ResourceW()
    cut(@Body() cutResourceDto: CutResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        const resourceType = ['content/', 'htmlPlugin/', 'pic/', 'file/']
        let isOldPathValid = false;
        let isNewPathValid = false;
        for (let i = 0; i < resourceType.length; i++) if (pathAuthorityValidation(DATA_PATH + "/resource/" + resourceType[i], DATA_PATH + "/resource/" + cutResourceDto.oldPath)) isOldPathValid = true;
        for (let i = 0; i < resourceType.length; i++) if (pathAuthorityValidation(DATA_PATH + "/resource/" + resourceType[i], DATA_PATH + "/resource/" + cutResourceDto.newPath)) isNewPathValid = true;
        if (!isOldPathValid || !isNewPathValid)  throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.resourceService.cut(cutResourceDto);
    }

    @Post('delete')
    @ResourceW()
    delete(@Body() deleteResourceDto: DeleteResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + deleteResourceDto.type === 'bin' ? "/resource/" : "/bin/" + deleteResourceDto.resourceType + "/",
            DATA_PATH + deleteResourceDto.type === 'bin' ? "/resource/" : "/bin/" + deleteResourceDto.resourceType + "/" + deleteResourceDto.path
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        if(this.resourceService.delete(deleteResourceDto))return generateResponse(ResponseCode.OK, "", null);
    }

    @Post('recovery')
    @ResourceW()
    recovery(@Body() recoveryResourceDto: RecoveryResourceDto) {
        //用于额外校验路径是否合法，详见方法中注释
        if (!pathAuthorityValidation(
            DATA_PATH + "/bin/" + recoveryResourceDto.resourceType + "/",
            DATA_PATH + "/bin/" + recoveryResourceDto.resourceType + "/" + recoveryResourceDto.fileName
        )) throw new HttpException('out-of-bounds path', ResponseCode.OUT_OF_BOUNDS_PATH);

        return this.resourceService.recovery(recoveryResourceDto);
    }

    @Get('export')
    @ResourceR()
    async export(@Res() res: Response) {
        const tempName = "_datatemp" + Date.now() + ".zip"
        await compressing.zip.compressDir(DATA_PATH, DATA_PATH + "/../" + tempName);
        res.download(DATA_PATH + "/../" + tempName, "data.zip", function (err) {
            rmSync(DATA_PATH + "/../" + tempName);
            if (err) throw err;
        });
    }

    @Post('import')
    @ResourceW()
    @UseInterceptors(FileInterceptor('data'))
    async import(@UploadedFile() data: Express.Multer.File, @Body() importResourceDto: ImportResourceDto) {
        //校验确保目标导入路径可达或为空
        if (!existsSync(importResourceDto.targetPath) && importResourceDto.targetPath !== "") throw new HttpException('path does not exist', ResponseCode.BAD_PATH);
        await this.resourceService.import(data, importResourceDto);
        SiteService.refreshAllCache();
        return generateResponse(ResponseCode.OK, '', null);
    }
}