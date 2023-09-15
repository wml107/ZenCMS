import { IsIn, IsNotEmpty, IsString, NotContains } from "class-validator";

export class RenameResourceDto {
    @IsString()
    @IsNotEmpty()
    path: string

    @IsString()
    //防止借着重命名切换目录，把文件移到别的地方去。因为node.js的rename功能的两个参数是新旧路径，还兼具移动文件功能。
    @NotContains('/')
    @NotContains('\\')
    @IsNotEmpty()
    newName: string
    
    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file'
    ])
    resourceType: string
}