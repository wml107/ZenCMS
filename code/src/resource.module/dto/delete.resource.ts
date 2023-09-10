import { IsIn, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class DeleteResourceDto {
    @IsString()
    @IsIn([
        'content',
        'htmlPlugin',
        'pic',
        'file'
    ])
    resourceType: string

    @IsString()
    @IsIn([
        'bin',
        'permanent'
    ])
    type: string

    @IsString()
    @IsNotEmpty()
    path: string
}