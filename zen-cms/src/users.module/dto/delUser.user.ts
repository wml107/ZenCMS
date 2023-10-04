import { IsNotEmpty, IsString, NotEquals } from "class-validator";

export class DelUserUserDto{
    @IsString()
    @IsNotEmpty()
    @NotEquals('super')
    username: string
}