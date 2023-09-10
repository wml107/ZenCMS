import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, NotContains } from "class-validator";

export class UpdateNodeStructureDto{
    @IsString()
    @IsNotEmpty()
    configPath: string

    @IsString()
    @IsNotEmpty()
    oldName: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @NotContains('\\')
    @NotContains('/')
    name: string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @NotContains('\\')
    @NotContains('/')
    path: string
    
    @IsOptional()
    @IsArray()
    @IsString({
        each: true
    })
    @IsNotEmpty({
        each: true
    })
    tags: string[]
    
    @IsOptional()
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
    
    @IsOptional()
    @IsBoolean()
    mind: boolean
    
    @IsOptional()
    @IsString()
    cover: string
}