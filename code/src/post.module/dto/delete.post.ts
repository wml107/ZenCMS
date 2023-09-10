import { IsInt } from "class-validator";

export class DeletePostDto {
  @IsInt()
  id: number;
}