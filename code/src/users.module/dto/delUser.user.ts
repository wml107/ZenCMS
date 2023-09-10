import { IsNotEmpty, IsString } from "class-validator";

export class DelUserUserDto{
    @IsString()
    @IsNotEmpty()
    username: string
}