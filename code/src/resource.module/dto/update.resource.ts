import { IsNotEmpty, IsString } from "class-validator";

export class UpdateResourceDto {
    @IsString()
    @IsNotEmpty()
    path: string

    @IsString()
    content: string
}