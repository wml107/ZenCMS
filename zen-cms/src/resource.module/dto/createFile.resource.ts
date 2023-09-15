import { IsIn, IsString, NotContains } from "class-validator";

export class CreateFileResourceDto {
    @IsString()
    path: string

    @IsString()
    @NotContains('\\')
    @NotContains('/')
    fileName: string

    @IsString()
    @IsIn([
        'html',
        'md',
        'json'
    ])
    fileType: string

    @IsString()
    content: string
}