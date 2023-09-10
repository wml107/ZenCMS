import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, NotContains } from "class-validator";

export class AddNodeStructureDto{
    @IsString()
    @IsNotEmpty()
    @NotContains('\\')
    @NotContains('/')
    name: string

    @IsString()
    @IsNotEmpty()
    @NotContains('\\')
    @NotContains('/')
    path: string

    @IsArray()
    @IsString({
        each: true
    })
    tags: string[]

    @IsString()
    @IsIn([
        'content_m',
        'content_h',
        'content_j',
        'index_m',
        'index_h',
        'index_j',
        'child'
    ])
    type: string

    @IsBoolean()
    mind: boolean

    @IsOptional()
    @IsString()
    cover: string

    @IsString()
    @IsNotEmpty()
    configPath: string
}