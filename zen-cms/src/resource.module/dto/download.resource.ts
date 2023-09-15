import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

export class DownloadResourceDto {
    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file'
    ])
    resourceType: string

    @IsString()
    @IsNotEmpty()
    path: string
}