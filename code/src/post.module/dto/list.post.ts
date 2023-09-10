import { IsDate, IsDateString, IsInt, IsOptional } from "class-validator";

export class ListPostDto {
  @IsInt()
  page: number;
  @IsInt()
  pageSize: number;
  @IsOptional()
  @IsDateString()
  timeStart: string;
  @IsOptional()
  @IsDateString()
  timeEnd: string;
}