import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class AddIgnoreFooterSiteDto{
    @IsString()
    @IsNotEmpty()
    routerPath: string

    @IsString()
    @IsNotEmpty()
    @IsIn([
        'strict',
        'prefix'
    ])
    ignoreType: string
}