import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {
  @IsInt()
  id: number;
  @IsString()
  content: string;
  @IsArray()
  @IsString({each: true})
  @IsNotEmpty({
    each: true
  })
  pic: string[];
}