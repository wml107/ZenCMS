import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class RecoveryResourceDto {
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
    fileName: string
}