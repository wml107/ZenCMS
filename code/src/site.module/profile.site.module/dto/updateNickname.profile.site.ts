import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNicknameProfileSiteDto{
    @IsString()
    @IsNotEmpty()
    nickName: string
}