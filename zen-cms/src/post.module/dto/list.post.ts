import { IsDate, IsDateString, IsInt, IsOptional, Min } from "class-validator";

export class ListPostDto {
  @IsInt()
  @Min(0)
  page: number;
  @IsInt()
  @Min(0)
  pageSize: number;
  @IsOptional()
  @IsDateString()
  timeStart: string;
  @IsOptional()
  @IsDateString()
  timeEnd: string;
}