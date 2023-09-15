import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class GetResourceDto {
    @IsString()
    @IsIn([
        'content'
    ])
    resourceType: string
    
    @IsString()
    @IsNotEmpty()
    path: string
}