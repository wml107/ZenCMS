import { IsIn, IsOptional, IsString } from "class-validator";

export class UploadResourceDto{
    file: Express.Multer.File[]

    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file'
    ])
    resourceType: string

    @IsOptional()
    @IsString()
    path: string
}