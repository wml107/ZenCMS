/// <reference types="multer" />
export declare class UploadResourceDto {
    file: Express.Multer.File[];
    resourceType: string;
    path: string;
}
