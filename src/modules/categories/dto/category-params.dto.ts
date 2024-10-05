import { Transform, Type } from "class-transformer";
import { 
  IsOptional,
} from "class-validator";
import { ParamsDto } from "src/global/dto/params.dto";
import { UpdateCategoryDto } from "./update-category.dto";
import { BadRequestException } from "@nestjs/common";

export class CategoryParamsDto extends ParamsDto {
  @Transform(({ value }) => {
    if(typeof value === "string") {
      try {
        return JSON.parse(value) as UpdateCategoryDto
      } catch (error) {
        throw new BadRequestException("Invalid JSON")
      }
    }
    return value as UpdateCategoryDto
  })
  @IsOptional()
  @Type(() => UpdateCategoryDto)
  filter?: UpdateCategoryDto = {}
}