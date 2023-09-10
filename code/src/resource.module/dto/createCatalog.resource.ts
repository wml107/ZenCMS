import { IsIn, IsNotEmpty, IsString, NotContains } from "class-validator";

export class CreateCatalogResourceDto {
    @IsString()
    path: string

    @IsString()
    @IsNotEmpty()
    @NotContains('\\')
    @NotContains('/')
    catalogName: string

    @IsString()
    @IsIn([
        'content',
        'pic',
        'file'
    ])
    resourceType: string
}