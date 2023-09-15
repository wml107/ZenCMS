/// <reference types="multer" />
import { ResourceService } from './resource.service';
import { GetResourceDto } from './dto/get.resource';
import { ListResourceDto } from './dto/list.resource';
import { DownloadResourceDto } from './dto/download.resource';
import { Response } from 'express';
import { CreateFileResourceDto } from './dto/createFile.resource';
import { CreateCatalogResourceDto } from './dto/createCatalog.resource';
import { UpdateResourceDto } from './dto/update.resource';
import { RenameResourceDto } from './dto/rename.resource';
import { DeleteResourceDto } from './dto/delete.resource';
import { RecoveryResourceDto } from './dto/recovery.resource';
import { CopyResourceDto } from './dto/copy.resource';
import { CutResourceDto } from './dto/cut.resource';
import { UploadResourceDto } from './dto/upload.resource';
import { ImportResourceDto } from './dto/import.resource';
export declare class ResourceController {
    private resourceService;
    constructor(resourceService: ResourceService);
    get(getResourceDto: GetResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    list(listResourceDto: ListResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    download(downloadResourceDto: DownloadResourceDto, res: Response): void;
    upload(file: Express.Multer.File[], uploadResourceDto: UploadResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    createFile(createFileResourceDto: CreateFileResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    createCatalog(createCatalogResourceDto: CreateCatalogResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    update(updateResourceDto: UpdateResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    rename(renameResourceDto: RenameResourceDto): string;
    copy(copyResourceDto: CopyResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    cut(cutResourceDto: CutResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    delete(deleteResourceDto: DeleteResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    recovery(recoveryResourceDto: RecoveryResourceDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    export(res: Response): Promise<void>;
    import(data: Express.Multer.File, importResourceDto: ImportResourceDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
}
