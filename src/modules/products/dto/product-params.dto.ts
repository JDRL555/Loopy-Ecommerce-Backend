import { Transform, Type } from "class-transformer";
import { 
  IsOptional,
} from "class-validator";
import { ParamsDto } from "src/global/dto/params.dto";
import { UpdateProductDto } from "./update-product.dto";
import { BadRequestException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

export class ProductParamsDto extends ParamsDto {
  @Transform(({ value }) => {
    if(typeof value === "string") {
      try {
        return JSON.parse(value) as UpdateProductDto
      } catch (error) {
        throw new BadRequestException("Invalid JSON")
      }
    }
    return value as UpdateProductDto
  })
  @IsOptional()
  @Type(() => UpdateProductDto)
  filter?: Prisma.ProductWhereInput = {}
}