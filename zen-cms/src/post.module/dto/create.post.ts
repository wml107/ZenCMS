import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  content: string;
  @IsArray()
  @IsString({each: true,})
  @IsNotEmpty({
    each:true
  })
  pic: string[];
}