import { IsIn, IsString, ValidateIf } from "class-validator";

export class ListResourceDto {
    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file',
        'bin',
    ])
    resourceType: string

    @ValidateIf( (req)=> req.resourceType !== 'bin' && req.resourceType !== 'htmlPlugin' )
    @IsString()
    path: string

    @ValidateIf( (req)=> req.resourceType === 'bin' && req.resourceType !== 'htmlPlugin' )
    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file',
    ])
    binType: string
}